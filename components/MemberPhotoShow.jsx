import React from 'react'

const MemberPhotoShow = (props) => {
  const { property, record } = props
  const url = record?.params?.[property.path]
  if (!url) return null
  return (
    <div>
      <img src={url} alt="member" style={{ maxWidth: 240, borderRadius: 6 }} />
    </div>
  )
}

export default MemberPhotoShow


