function TemplateSelector({
    selectedTemplate,
    setSelectedTemplate
}) {

    return (

        <select
            className="form-select template-select mb-4"
            value={selectedTemplate}
            onChange={(e) =>
                setSelectedTemplate(e.target.value)
            }
        >

            <option value="modern">
                Modern Template
            </option>

            <option value="minimal">
                Minimal Template
            </option>

            <option value="ats">
                ATS Friendly
            </option>

        </select>

    )
}

export default TemplateSelector
