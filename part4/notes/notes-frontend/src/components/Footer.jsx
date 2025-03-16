const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        YoyoMcGees Note App  {new Date().getFullYear()}
      </em>
    </div>
  )
}

export default Footer
