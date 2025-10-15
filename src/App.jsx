import React, { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const sampleJSON = {
    name: "John Doe",
    title: "Frontend Developer",
    contact: { email: "john@example.com", phone: "+1234567890", website: "www.johndoe.com" },
    skills: [
        { name: "React", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "JavaScript", level: 85 },
        { name: "CSS", level: 70 }
    ],
    experience: [
        { company: "Company A", role: "Frontend Dev", years: "2022-2025" },
        { company: "Company B", role: "Intern", years: "2021-2022" }
    ],
    education: [
        { school: "University X", degree: "B.Sc Computer Science", year: "2018-2022" }
    ]
}

export default function App() {
    const [resumeJSON, setResumeJSON] = useState(JSON.stringify(sampleJSON, null, 2))
    const [template, setTemplate] = useState('classic')
    const [darkMode, setDarkMode] = useState(false)
    const [photo, setPhoto] = useState(null)
    const previewRef = useRef()

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : 'light'
    }, [darkMode])

    const handleExportPDF = () => {
        html2canvas(previewRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('resume.pdf')
        })
    }

    const handleDownloadJSON = () => {
        const blob = new Blob([resumeJSON], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'resume.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleLoadSample = () => setResumeJSON(JSON.stringify(sampleJSON, null, 2))

    let resumeData
    try { resumeData = JSON.parse(resumeJSON) } catch { resumeData = null }

    return (
        <div className="container">
            <div className="editor">
                <h2>Resume JSON Editor</h2>
                <textarea value={resumeJSON} onChange={e => setResumeJSON(e.target.value)} />
                <br />
                <button onClick={handleLoadSample}>Load Sample JSON</button>
                <button onClick={handleDownloadJSON}>Download JSON</button>
                <button onClick={handleExportPDF}>Export PDF</button>
                <br /><br />
                <label>Template: </label>
                <select value={template} onChange={e => setTemplate(e.target.value)}>
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="creative">Creative</option>
                </select>
                <br /><br />
                <label>
                    <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    Dark Mode
                </label>
                <br /><br />
                <label>Upload Photo: </label>
                <input type="file" accept="image/*" onChange={e => setPhoto(URL.createObjectURL(e.target.files[0]))} />
            </div>

            <div className="preview" ref={previewRef}>
                {resumeData ? (
                    <div>
                        {photo && <img src={photo} alt="Profile" style={{width:80, height:80, borderRadius:'50%'}} />}
                        <h1>{resumeData.name}</h1>
                        <h3>{resumeData.title}</h3>
                        <p>Email: {resumeData.contact?.email}</p>
                        <p>Phone: {resumeData.contact?.phone}</p>
                        <p>Website: {resumeData.contact?.website}</p>

                        <h3>Skills</h3>
                        {resumeData.skills?.map((s,i) => (
                            <div key={i}>
                                <span>{s.name}</span>
                                <div className="skill-bar">
                                    <div className="skill-bar-inner" style={{width:`${s.level}%`}}></div>
                                </div>
                            </div>
                        ))}

                        <h3>Experience</h3>
                        <ul>
                            {resumeData.experience?.map((exp,i) => (
                                <li key={i}>{exp.role} at {exp.company} ({exp.years})</li>
                            ))}
                        </ul>

                        <h3>Education</h3>
                        <ul>
                            {resumeData.education?.map((edu,i) => (
                                <li key={i}>{edu.degree} - {edu.school} ({edu.year})</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p style={{color:'red'}}>Invalid JSON</p>
                )}
            </div>
        </div>
    )
}
