import html2pdf from 'html2pdf.js'
import { Download, FileText, LayoutTemplate } from 'lucide-react'

import TemplateSelector from './TemplateSelector'

import ModernTemplate from '../templates/ModernTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import ATSResumeTemplate from '../templates/ATSResumeTemplate'

function ResumePreview({
    resumeData,
    selectedTemplate,
    setSelectedTemplate
}) {

    const downloadPDF = () => {

        const element = document.getElementById('resume-preview')

        const options = {

            margin: 0.5,

            filename: 'resume.pdf',

            image: {
                type: 'jpeg',
                quality: 1
            },

            html2canvas: {
                scale: 2
            },

            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }

        }

        html2pdf()
            .set(options)
            .from(element)
            .save()

    }

    return (

        <div>

            {/* Template Selector */}

            <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
            />

            {/* Resume Preview */}

            {
                resumeData ? (

                    <>

                        {
                            selectedTemplate === 'modern' &&
                            <ModernTemplate data={resumeData} />
                        }

                        {
                            selectedTemplate === 'minimal' &&
                            <MinimalTemplate data={resumeData} />
                        }

                        {
                            selectedTemplate === 'ats' &&
                            <ATSResumeTemplate data={resumeData} />
                        }

                        {/* Download Button */}

                        <button
                            className="btn btn-primary w-100 mt-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                            onClick={downloadPDF}
                        >
                            <Download size={16} />
                            Download Resume PDF
                        </button>

                    </>

                ) : (

                    <div className="preview-empty-state">

                        <div className="text-center px-4">

                            <div className="preview-empty-icon mx-auto mb-3">
                                <FileText size={28} />
                            </div>

                            <h5 className="text-dark fw-bold mb-2">
                                Resume Preview Appears Here
                            </h5>

                            <p className="text-muted small mb-4">
                                Fill the form and generate your resume to preview the selected template.
                            </p>

                            <div className="d-flex justify-content-center">
                                <span className="app-chip">
                                    <LayoutTemplate size={14} />
                                    {selectedTemplate} template
                                </span>
                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    )
}

export default ResumePreview
