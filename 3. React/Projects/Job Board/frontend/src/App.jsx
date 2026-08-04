import { useMemo, useState } from 'react'
import './App.css'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'BrightWave',
    location: 'Kathmandu, Nepal',
    salary: 'Rs. 60,000',
    type: 'Full-time',
    description: 'Build responsive UI and collaborate with design to ship web features.',
  },
  {
    id: 2,
    title: 'Remote Product Designer',
    company: 'Nimbus Labs',
    location: 'Remote',
    salary: 'USD 1,500',
    type: 'Remote',
    description: 'Design workflows for modern apps and improve product usability.',
  },
  {
    id: 3,
    title: 'Intern Software Engineer',
    company: 'NextGen Tech',
    location: 'Pokhara, Nepal',
    salary: 'Rs. 20,000',
    type: 'Internship',
    description: 'Participate in sprint planning, write code, and learn software best practices.',
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'CodePulse',
    location: 'Lalitpur, Nepal',
    salary: 'Rs. 80,000',
    type: 'Full-time',
    description: 'Create APIs, optimize database queries, and support deployment pipelines.',
  },
]

const filterOptions = ['All', 'Full-time', 'Remote', 'Internship']

function App() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [savedJobs, setSavedJobs] = useState([])
  const [application, setApplication] = useState({
    jobId: null,
    name: '',
    email: '',
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredJobs = useMemo(() => {
    if (selectedFilter === 'All') {
      return jobs
    }
    return jobs.filter((job) => job.type === selectedFilter)
  }, [selectedFilter])

  const toggleSaveJob = (jobId) => {
    setSavedJobs((current) =>
      current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId]
    )
  }

  const selectJobToApply = (jobId) => {
    setApplication((current) => ({
      ...current,
      jobId,
      name: '',
      email: '',
      resume: null,
    }))
    setSubmitted(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setApplication((current) => ({ ...current, [name]: value }))
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] ?? null
    setApplication((current) => ({ ...current, resume: file }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!application.jobId) {
      return
    }
    setSubmitted(true)
  }

  const selectedJob = jobs.find((job) => job.id === application.jobId)

  return (
    <div className="app-container">
      <header className="hero-section">
        <div>
          <p className="eyebrow">Ke hunchha?</p>
          <h1>Job Board</h1>
          <p className="hero-copy">
            Simple platform to browse jobs, save favorites, and submit an application.
          </p>
        </div>
        <div className="hero-stats">
          <span>{jobs.length} Jobs</span>
          <span>{savedJobs.length} Saved</span>
          <span>{filterOptions.length - 1} Job Types</span>
        </div>
      </header>

      <section className="controls">
        <div className="filter-row">
          <p>Filter by job type:</p>
          <div className="filter-group">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedFilter(option)}
                className={selectedFilter === option ? 'filter-button active' : 'filter-button'}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="main-grid">
        <section className="job-list-section">
          <div className="section-heading">
            <h2>Available Jobs</h2>
            <p>{filteredJobs.length} positions found</p>
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card-title">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <span className="job-type">{job.type}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-meta">
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>
                <div className="job-actions">
                  <button
                    type="button"
                    className={savedJobs.includes(job.id) ? 'bookmark-button active' : 'bookmark-button'}
                    onClick={() => toggleSaveJob(job.id)}
                  >
                    {savedJobs.includes(job.id) ? 'Saved' : 'Save Job'}
                  </button>
                  <button type="button" className="apply-button" onClick={() => selectJobToApply(job.id)}>
                    Apply
                  </button>
                </div>
              </article>
            ))}
            {filteredJobs.length === 0 && (
              <p className="empty-state">No jobs match this filter yet.</p>
            )}
          </div>
        </section>

        <aside className="application-panel">
          <div className="section-heading">
            <h2>Application Form</h2>
            <p>Choose a job and send your details.</p>
          </div>

          <div className="application-status">
            {selectedJob ? (
              <>
                <p>Applying for:</p>
                <strong>{selectedJob.title}</strong>
                <span>{selectedJob.company}</span>
              </>
            ) : (
              <p>Select a job card to start your application.</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="application-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={application.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                disabled={!selectedJob}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={application.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                disabled={!selectedJob}
              />
            </label>

            <label className="file-label">
              Resume upload
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                disabled={!selectedJob}
              />
              <span className="file-hint">
                {application.resume ? application.resume.name : 'Choose a file to upload'}
              </span>
            </label>

            <button type="submit" className="submit-button" disabled={!selectedJob}>
              Submit Application
            </button>

            {submitted && selectedJob && (
              <div className="success-message">
                Application submitted for <strong>{selectedJob.title}</strong>.
              </div>
            )}
          </form>

          <div className="saved-summary">
            <h3>Saved Jobs</h3>
            {savedJobs.length > 0 ? (
              <ul>
                {savedJobs.map((jobId) => {
                  const job = jobs.find((item) => item.id === jobId)
                  return job ? <li key={jobId}>{job.title} at {job.company}</li> : null
                })}
              </ul>
            ) : (
              <p>No saved jobs yet. Click Save Job to bookmark.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
