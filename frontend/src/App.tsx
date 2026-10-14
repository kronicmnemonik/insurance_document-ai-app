
import { useState } from "react";
import { FileText, Upload, ShieldCheck, AlertCircle } from "lucide-react";
import type { DocumentJob } from "./types";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState<DocumentJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Choose a document first.");
      return;
    }

    setLoading(true);
    setError("");
    setJob(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail ?? "Upload failed.");
      }

      const data: DocumentJob = await response.json();
      setJob(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const result = job?.result;

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">
          <ShieldCheck size={25} />
          <span>ClaimLens</span>
        </div>
        <span className="tag">DEMO ENVIRONMENT</span>
      </header>

      <section className="intro">
        <p className="eyebrow">INSURANCE OPERATIONS</p>
        <h1>Document intelligence</h1>
        <p className="subtitle">
          Upload a claim document and turn it into structured information
          for review.
        </p>
      </section>

      <section className="panel">
        <div className="section-heading">
          <FileText size={21} />
          <h2>Upload a document</h2>
        </div>

        <label className="dropzone">
          <Upload size={30} />
          <strong>{file ? file.name : "Choose a document"}</strong>
          <span>PDF, PNG, or JPEG · Maximum 10 MB</span>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setJob(null);
              setError("");
            }}
          />
        </label>

        <button
          className="primary-button"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? "Processing..." : "Upload and extract"}
        </button>

        {error && (
          <p className="error">
            <AlertCircle size={18} /> {error}
          </p>
        )}
      </section>

      {job && result && (
        <section className="panel results">
          <div className="result-header">
            <div>
              <p className="eyebrow">EXTRACTION RESULTS</p>
              <h2>{job.filename}</h2>
            </div>
            <span className="status">{job.status}</span>
          </div>

          <div className="notice">
            OCR completed. Please verify extracted information before use.
          </div>

          <div className="fields">
            <Field
              label="Document type"
              value={result.document_type || "Not detected"}
            />
            <Field
              label="Claim number"
              value={result.claim_number || "Not detected"}
            />
            <Field
              label="Policy number"
              value={result.policy_number || "Not detected"}
            />

            <Field
              label="Policyholder"
              value={result.policyholder_name || "Not detected"}
            />
            <Field
              label="Address"
              value={result.policyholder_address || "Not detected"}
            />
            <Field
              label="Phone"
              value={result.policyholder_phone || "Not detected"}
            />
            <Field
              label="Email"
              value={result.policyholder_email || "Not detected"}
            />

            <Field
              label="Vehicle year"
              value={result.vehicle_year || "Not detected"}
            />
            <Field
              label="Vehicle make"
              value={result.vehicle_make || "Not detected"}
            />
            <Field
              label="Vehicle model"
              value={result.vehicle_model || "Not detected"}
            />
            <Field
              label="Vehicle registration"
              value={result.vehicle_registration || "Not detected"}
            />
            <Field
              label="VIN"
              value={result.vehicle_vin || "Not detected"}
            />

            <Field
              label="Incident date"
              value={result.incident_date || "Not detected"}
            />
            <Field
              label="Report date"
              value={result.report_date || "Not detected"}
            />
            <Field
              label="Incident time"
              value={result.incident_time || "Not detected"}
            />
            <Field
              label="Incident location"
              value={result.incident_location || "Not detected"}
            />
            <Field
              label="Incident description"
              value={result.incident_description || "Not detected"}
            />

            <Field
              label="Other party"
              value={result.other_party_name || "Not detected"}
            />
            <Field
              label="Other insurer"
              value={result.other_party_insurer || "Not detected"}
            />
            <Field
              label="Damage description"
              value={result.damage_description || "Not detected"}
            />
            <Field
              label="Estimated repair cost"
              value={
                result.claimed_amount != null
                  ? `$${result.claimed_amount.toLocaleString("en-CA")} CAD`
                  : "Not detected"
              }
            />

            <Field
              label="Weather"
              value={result.weather_conditions || "Not detected"}
            />
            <Field
              label="Road conditions"
              value={result.road_conditions || "Not detected"}
            />
            <Field
              label="Injuries"
              value={result.injuries_reported || "Not detected"}
            />
          </div>

          <div className="review">
            <AlertCircle size={20} />
            <div>
              
              {result.requires_human_review && (
                <p className="review-notice">
                  Human review required. Verify missing or uncertain information.
                </p>
              )}

              {result.missing_fields?.length > 0 && (
                <p>
                  Missing fields: {result.missing_fields.join(", ")}
                </p>
              )}

              {result.confidence_notes?.length > 0 && (
                <ul>
                  {result.confidence_notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              )}
              
            </div>
          </div>

          <p className="job-id">Job ID: {job.job_id}</p>
        </section>
      )}

      <footer>
        ClaimLens · Educational prototype · Not for real claim decisions
      </footer>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
