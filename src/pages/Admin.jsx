import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Plus, Pencil, Trash2, Download, Upload, RotateCcw, X, Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { categories } from '../data/products'
import { setAdminAuthed } from '../components/RequireAdmin'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const emptyForm = {
  name: '',
  category: 'hair',
  price: '',
  image: '',
  description: '',
  isNew: false,
}

export default function Admin() {
  const {
    products,
    loading,
    error: loadError,
    addProduct,
    updateProduct,
    removeProduct,
    resetToDefaults,
    importProducts,
  } = useProducts()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const imageFileRef = useRef(null)

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const grouped = useMemo(() => {
    return categories.map((c) => ({
      ...c,
      items: products.filter((p) => p.category === c.slug),
    }))
  }, [products])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setAdminAuthed(false)
    navigate('/admin/login')
  }

  const startAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const startEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      image: product.image,
      description: product.description,
      isNew: Boolean(product.isNew),
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price) {
      showToast('Please add at least a name and price.')
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        await updateProduct(editingId, form)
        showToast('Product updated — visible to everyone now.')
      } else {
        await addProduct(form)
        showToast('Product added — visible to everyone now.')
      }
      cancelForm()
    } catch (err) {
      showToast(err.message || 'Something went wrong saving that product.')
    } finally {
      setSaving(false)
    }
  }

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (isSupabaseConfigured) {
      setUploadingImage(true)
      try {
        const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(path, file, { cacheControl: '3600', upsert: false })
        if (uploadError) throw uploadError
        const { data } = supabase.storage.from('product-images').getPublicUrl(path)
        setForm((f) => ({ ...f, image: data.publicUrl }))
      } catch (err) {
        showToast(err.message || 'Image upload failed.')
      } finally {
        setUploadingImage(false)
      }
      return
    }

    // No backend configured: the image gets embedded directly as text in
    // localStorage, which has a hard ~5MB total quota shared by the whole
    // catalogue. Block large files here instead of letting them pile up
    // and eventually crash the page with a quota error.
    const MAX_LOCAL_IMAGE_BYTES = 250 * 1024
    if (file.size > MAX_LOCAL_IMAGE_BYTES) {
      showToast(
        "That photo is too large to store without a backend (over 250KB). Use a hosted image URL instead, or connect Supabase (see README) so uploads work properly."
      )
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'beacia-products.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => fileInputRef.current?.click()

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result)
        await importProducts(parsed)
        showToast('Catalogue imported — visible to everyone now.')
      } catch (err) {
        showToast(err.message || 'That file could not be read as a product catalogue.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
            Product manager
          </h1>
          <p className="mt-1 text-sm text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
            {isSupabaseConfigured
              ? 'Changes here go live for every visitor immediately.'
              : 'Changes here save to this browser only — connect Supabase (see README) to make them live for every visitor.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 rounded-full bg-[var(--color-espresso)] px-4 py-2 text-sm font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold-deep)] dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)]"
          >
            <Plus size={15} /> Add product
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 px-4 py-2 text-sm text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {/* Backup toolbar */}
      <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-ivory-dim)] p-4 dark:bg-[var(--color-espresso-light)]">
        <span className="mr-1 text-xs font-medium uppercase tracking-wide text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
          Catalogue backup
        </span>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 px-3 py-1.5 text-xs text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
        >
          <Download size={13} /> Export JSON
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 px-3 py-1.5 text-xs text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
        >
          <Upload size={13} /> Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
        />
        <button
          onClick={() => setConfirmReset(true)}
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 px-3 py-1.5 text-xs text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
        >
          <RotateCcw size={13} /> Reset to default catalogue
        </button>
      </div>

      {/* Add / edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-cream)] p-6 dark:bg-[var(--color-espresso-light)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                {editingId ? 'Edit product' : 'New product'}
              </h2>
              <button type="button" onClick={cancelForm} aria-label="Close form">
                <X size={18} className="text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-cream)] px-3 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)] dark:bg-[var(--color-espresso-light)] dark:text-[var(--color-ivory)]"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  Price (£)
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)]"
                />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <label className="flex items-center gap-2 text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))}
                    className="h-4 w-4 accent-[var(--color-gold-deep)]"
                  />
                  Show in "Just In"
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  Image URL
                </label>
                <input
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)]"
                />
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => imageFileRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 px-3 py-1 text-xs text-[var(--color-espresso)] transition-colors hover:bg-[var(--color-gold)]/10 disabled:opacity-60 dark:text-[var(--color-ivory)]"
                  >
                    {uploadingImage && <Loader2 size={12} className="animate-spin" />}
                    {uploadingImage ? 'Uploading...' : 'Or upload a photo'}
                  </button>
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFile}
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-[var(--color-espresso)]/70 dark:text-[var(--color-ivory)]/70">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full resize-none rounded-lg border border-[var(--color-gold)]/30 bg-transparent px-3 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)] dark:text-[var(--color-ivory)]"
                />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-espresso)] px-6 py-2.5 text-sm font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold-deep)] disabled:opacity-60 dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)]"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? 'Save changes' : 'Add product'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="rounded-full border border-[var(--color-gold)]/40 px-6 py-2.5 text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading && (
        <p className="mb-6 flex items-center gap-2 text-sm text-[var(--color-espresso)]/60 dark:text-[var(--color-ivory)]/60">
          <Loader2 size={14} className="animate-spin" /> Loading the live catalogue...
        </p>
      )}
      {loadError === 'QUOTA' && (
        <p className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>Storage is full.</strong> Your browser's local storage can't fit the current
          catalogue (this usually happens after uploading several photos without Supabase
          connected — see README section 3a). Your latest change isn't saved and will be lost on
          refresh. Remove a photo-heavy product below, or connect Supabase for reliable image
          hosting.
        </p>
      )}
      {loadError && loadError !== 'QUOTA' && (
        <p className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load products: {loadError}
        </p>
      )}

      {/* Product list by category */}
      <div className="flex flex-col gap-10">
        {grouped.map((cat) => (
          <div key={cat.slug}>
            <h2 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
              {cat.label}{' '}
              <span className="text-sm font-normal text-[var(--color-espresso)]/50 dark:text-[var(--color-ivory)]/50">
                ({cat.items.length})
              </span>
            </h2>
            {cat.items.length === 0 ? (
              <p className="text-sm text-[var(--color-espresso)]/50 dark:text-[var(--color-ivory)]/50">
                No products in this category yet.
              </p>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[var(--color-gold)]/20">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {cat.items.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-[var(--color-gold)]/10 last:border-0"
                      >
                        <td className="w-16 p-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                            {p.name}
                          </p>
                          {p.isNew && (
                            <span className="text-[10px] uppercase tracking-wide text-[var(--color-gold-deep)] dark:text-[var(--color-gold-light)]">
                              New
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-[var(--color-espresso)]/80 dark:text-[var(--color-ivory)]/80">
                          £{Number(p.price).toFixed(2)}
                        </td>
                        <td className="w-24 p-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEdit(p)}
                              aria-label={`Edit ${p.name}`}
                              className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-espresso)] hover:bg-[var(--color-gold)]/10 dark:text-[var(--color-ivory)]"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(p.id)}
                              aria-label={`Delete ${p.name}`}
                              className="grid h-8 w-8 place-items-center rounded-full text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/50 px-5"
            onClick={() => setConfirmDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-[var(--color-cream)] p-6 text-center dark:bg-[var(--color-espresso-light)]"
            >
              <p className="text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                Remove this product? This can't be undone, and it disappears for every visitor
                immediately.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={async () => {
                    const id = confirmDeleteId
                    setConfirmDeleteId(null)
                    try {
                      await removeProduct(id)
                      showToast('Product removed for everyone.')
                    } catch (err) {
                      showToast(err.message || 'Could not remove that product.')
                    }
                  }}
                  className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white"
                >
                  Remove
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="rounded-full border border-[var(--color-gold)]/40 px-5 py-2 text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset confirm modal */}
      <AnimatePresence>
        {confirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/50 px-5"
            onClick={() => setConfirmReset(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-[var(--color-cream)] p-6 text-center dark:bg-[var(--color-espresso-light)]"
            >
              <p className="text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]">
                Reset the catalogue to the original default products for every visitor? Added and
                edited products will be lost — export a backup first if you're not sure.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={async () => {
                    setConfirmReset(false)
                    try {
                      await resetToDefaults()
                      showToast('Catalogue reset for everyone.')
                    } catch (err) {
                      showToast(err.message || 'Could not reset the catalogue.')
                    }
                  }}
                  className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white"
                >
                  Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="rounded-full border border-[var(--color-gold)]/40 px-5 py-2 text-sm text-[var(--color-espresso)] dark:text-[var(--color-ivory)]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-[var(--color-espresso)] px-5 py-2.5 text-sm text-[var(--color-ivory)] shadow-lg dark:bg-[var(--color-gold)] dark:text-[var(--color-espresso)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
