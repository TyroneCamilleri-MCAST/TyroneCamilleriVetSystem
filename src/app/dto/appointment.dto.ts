export class Appointment {
  private _appointmentId: number;
  private _patientName: string;
  private _animalType: string;
  private _ownerIdCardNumber: string;
  private _ownerName: string;
  private _ownerSurname: string;
  private _ownerContactNumber: string;
  private _appointmentDate: string;
  private _appointmentTime: string;
  private _appointmentDuration: number;
  private _reasonForAppointment: string;
  private _vetNotes: string;

  constructor(
    appointmentId: number,
    patientName: string,
    animalType: string,
    ownerIdCardNumber: string,
    ownerName: string,
    ownerSurname: string,
    ownerContactNumber: string,
    appointmentDate: string,
    appointmentTime: string,
    appointmentDuration: number,
    reasonForAppointment: string,
    vetNotes: string
  ) {
    this._appointmentId = appointmentId;
    this._patientName = patientName;
    this._animalType = animalType;
    this._ownerIdCardNumber = ownerIdCardNumber;
    this._ownerName = ownerName;
    this._ownerSurname = ownerSurname;
    this._ownerContactNumber = ownerContactNumber;
    this._appointmentDate = appointmentDate;
    this._appointmentTime = appointmentTime;
    this._appointmentDuration = appointmentDuration;
    this._reasonForAppointment = reasonForAppointment;
    this._vetNotes = vetNotes;
  }

  public get appointmentId(): number {
    return this._appointmentId;
  }

  public set appointmentId(appointmentId: number) {
    this._appointmentId = appointmentId;
  }

  public get patientName(): string {
    return this._patientName;
  }

  public set patientName(patientName: string) {
    this._patientName = patientName;
  }

  public get animalType(): string {
    return this._animalType;
  }

  public set animalType(animalType: string) {
    this._animalType = animalType;
  }

  public get ownerIdCardNumber(): string {
    return this._ownerIdCardNumber;
  }

  public set ownerIdCardNumber(ownerIdCardNumber: string) {
    this._ownerIdCardNumber = ownerIdCardNumber;
  }

  public get ownerName(): string {
    return this._ownerName;
  }

  public set ownerName(ownerName: string) {
    this._ownerName = ownerName;
  }

  public get ownerSurname(): string {
    return this._ownerSurname;
  }

  public set ownerSurname(ownerSurname: string) {
    this._ownerSurname = ownerSurname;
  }

  public get ownerContactNumber() {
    return this._ownerContactNumber;
  }

  public set ownerContactNumber(ownerContactNumber: string) {
    this._ownerContactNumber = ownerContactNumber;
  }

  public get appointmentDate(): string {
    return this._appointmentDate;
  }

  public set appointmentDate(appointmentDate: string) {
    this._appointmentDate = appointmentDate;
  }

  public get appointmenTime(): string {
    return this._appointmentTime;
  }

  public set appointmentTime(appointmentTime: string) {
    this._appointmentTime = appointmentTime;
  }

  public get appointmentDuration(): number {
    return this._appointmentDuration;
  }

  public set appointmentDuration(appointmentDuration: number) {
    this._appointmentDuration = appointmentDuration;
  }

  public get reasonForAppointment(): string {
    return this._reasonForAppointment;
  }

  public set reasonForAppointment(reasonForAppointment: string) {
    this._reasonForAppointment = reasonForAppointment;
  }

  public get vetNotes(): string {
    return this._vetNotes;
  }

  public set vetNotes(vetNotes: string) {
    this._vetNotes = vetNotes;
  }
}
