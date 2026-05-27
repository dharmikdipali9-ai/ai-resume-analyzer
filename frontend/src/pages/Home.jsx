import Navbar from '../components/Navbar'

function Home() {

    return (

        <div className="app-page d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Navbar />

            <main className="container d-flex align-items-center justify-content-center flex-grow-1 py-5">

                <section className="hero-panel text-center p-4 p-lg-5 w-100">
                    <div className="position-relative" style={{ zIndex: 1 }}>
                        <span className="badge rounded-pill px-3 py-2 mb-3 fw-semibold" style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' }}>
                            AI Career Workspace
                        </span>

                        <h1 className="display-3 fw-bold mb-3">
                            AI Resume <span className="app-gradient-text">Analyzer</span>
                        </h1>

                        <p className="lead mx-auto mb-0" style={{ maxWidth: '680px', color: 'rgba(255,255,255,.78)' }}>
                            Analyze resumes, build polished versions, and practice mock interviews using AI.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Home
