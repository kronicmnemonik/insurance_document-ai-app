
export interface ExtractionResult {
  document_type: string;
  claim_number: string | null;
  policy_number: string | null;
  policyholder_name: string | null;
  policyholder_address: string | null;
  policyholder_phone: string | null;
  policyholder_email: string | null;
  vehicle_year: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_registration: string | null;
  vehicle_vin: string | null;
  incident_date: string | null;
  report_date: string | null;
  incident_time: string | null;
  incident_location: string | null;
  incident_description: string | null;
  weather_conditions: string | null;
  road_conditions: string | null;
  other_party_name: string | null;
  other_party_insurer: string | null;
  damage_description: string | null;
  claimed_amount: number | null;
  injuries_reported: string | null;
  confidence_notes: string[];
  missing_fields: string[];
  requires_human_review: boolean;
}

export interface DocumentJob {
  job_id: string;
  status: string;
  filename: string;
  result: ExtractionResult;
}
