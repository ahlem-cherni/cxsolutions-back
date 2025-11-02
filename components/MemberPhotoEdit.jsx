import React, { useCallback, useState } from 'react'

const MemberPhotoEdit = (props) => {
  const { onChange, property, record } = props
  const current = record?.params?.[property.path] || ''
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(current)

  const handleFile = useCallback(async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const json = await res.json()
      if (json && json.url) {
        onChange(property.path, json.url)
        setPreview(json.url)
      }
    } catch (e) {
      // no-op
    } finally {
      setUploading(false)
    }
  }, [onChange, property.path])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files && e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const onSelect = useCallback((e) => {
    const file = e.target.files && e.target.files[0]
    handleFile(file)
  }, [handleFile])

  return (
    <div style={{ marginTop: 12 }}>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: '2px dashed #cbd5e1',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: '#fafafa'
        }}
        onClick={() => document.getElementById(`file-${property.path}`).click()}
      >
        {preview ? (
          <img src={preview} alt="preview" style={{ maxHeight: 120, borderRadius: 6 }} />
        ) : (
          <>
            <div style={{ marginBottom: 8, color: '#64748b' }}>
              Drop your file here, or click to browse
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Max size: 5 MB. PNG/JPG.</div>
          </>
        )}
      </div>
      <input id={`file-${property.path}`} type="file" accept="image/*;capture=camera" style={{ display: 'none' }} onChange={onSelect} />
      {uploading && <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>Uploading...</div>}
    </div>
  )
}

export default MemberPhotoEdit


