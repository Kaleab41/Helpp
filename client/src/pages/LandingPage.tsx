type LandingProp = {
  SetRegistrationModal: (value: boolean) => void
}
export default function LandingPage({ SetRegistrationModal }: LandingProp) {
  return (
    <div>
      {" "}
      <section style={heroStyle}>
        <h2 style={heroHeading}>HiLPortal</h2>
        <p style={heroSubheading}>An Acadamic Portal for the HiLCoE community</p>
        <button className="rounded-lg font-bold" onClick={() => SetRegistrationModal(true)} style={heroButton}> Apply</button>
      </section>
      {/* Features Section */}
      <section style={featuresStyle}>
        <div style={featureContainer}>
          <div style={feature}>
            <i className="fas fa-mobile-alt" style={iconStyle}></i>
            <h3 style={featureHeading}>Fast Access</h3>
            <p style={featureDescription}>Access your data any place</p>
          </div>
          <div style={feature}>
            <i className="fas fa-cogs" style={iconStyle}></i>
            <h3 style={featureHeading}>Reliable</h3>
            <p style={featureDescription}>All your data is kept safe.</p>
          </div>
          <div style={feature}>
            <i className="fas fa-rocket" style={iconStyle}></i>
            <h3 style={featureHeading}>Realtime</h3>
            <p style={featureDescription}>Communicate with the school community realtime.</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={footerStyle}>
        <p style={footerText}>&copy; 2024 HiLCoe. All rights reserved.</p>
      </footer>
    </div>
  )
}

// Styles
const headerStyle = {
  backgroundColor: "rgb(4, 116, 129)",
  color: "white",
  padding: "20px",
}

const logoContainer = {
  display: "flex",
  alignItems: "center",
}

const logoStyle = {
  width: "100px",
}

const headingStyle = {
  marginLeft: "10px",
}

const navStyle = {
  display: "flex",
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "20px",
}

const heroStyle = {
  backgroundColor: "rgb(4, 116, 129)",
  color: "white",
  padding: "100px 0",
  textAlign: "center",
}

const heroHeading = {
  fontSize: "2.5rem",
  marginBottom: "20px",
}

const heroSubheading = {
  fontSize: "1.2rem",
}

const heroButton = {
  backgroundColor: "white",
  color: "rgb(4, 116, 129)",
  border: "none",
  padding: "10px 20px",
  fontSize: "1rem",
  marginTop: "20px",
  cursor: "pointer",
}

const featuresStyle = {
  backgroundColor: "#f8f9fa",
  padding: "100px 0",
}

const featureContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
}

const feature = {
  textAlign: "center",
}

const iconStyle = {
  fontSize: "2rem",
  marginBottom: "20px",
}

const featureHeading = {
  fontSize: "1.5rem",
  marginBottom: "10px",
}

const featureDescription = {
  fontSize: "1rem",
}

const footerStyle = {
  backgroundColor: "rgb(4, 116, 129)",
  color: "white",
  padding: "50px 0",
  textAlign: "center",
}

const footerText = {
  fontSize: "1rem",
}
