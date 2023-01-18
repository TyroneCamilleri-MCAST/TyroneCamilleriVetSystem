import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../dto/appointment.dto';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  role: String | null = '';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService
      .getAppointments()
      .subscribe((response: Appointment[]) => {
        this.appointments = response;
      });
  }

  deleteApplication(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.getAppointments();
    });
  }

  createHeaders(keys: String) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: 'center',
        padding: 0,
      });
    }
    return result;
  }
  exportToPdf() {
    if (this.appointments.length > 0) {
      let result: any[] = [];

      this.appointments.forEach((appointment: Appointment) => {
        result.push(Object.values(appointment));
      });

      let date = new Date();
      let doc = new jsPDF({ orientation: 'landscape' });
      autoTable(doc, {
        head: [
          [
            'Appointment Id',
            'Name',
            'Type',
            'National Id',
            'First Name',
            'Last Name',
            'Phone Number',
            'Date',
            'Time',
            'Duration',
            'Reason for appointment',
            'Vet Notes',
          ],
        ],
        body: result,
        didParseCell: (data) => {
          if (data.section === 'body' && data.column.index == 7) {
            let europenDate = data.cell.text[0].split('/');
            let americanDate = `${europenDate[1]}//${europenDate[0]}//${europenDate[2]}`;
            let parsedDate = new Date(americanDate);
            if (parsedDate > date) {
              for (let index = 0; index < 11; index++) {
                data.row.cells[index].styles.fillColor = '#008080';
              }
            }
          }
        },
      });

      let fileName = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}_${date.getSeconds()}_${date.getMilliseconds()}`;
      doc.save(`${fileName}.pdf`);
    }
  }

  async exportToExcel() {
    const workbook = new Workbook();
    const workSheet = workbook.addWorksheet('Vet Appointments');
    let date = new Date();

    workSheet.addRow(Object.keys(this.appointments[0]));
    this.appointments.forEach((appointment: Appointment) => {
      let europenDate = appointment.appointmentDate.split('/');
      let americanDate = `${europenDate[1]}//${europenDate[0]}//${europenDate[2]}`;
      let parsedDate = new Date(americanDate);
      if (parsedDate > date) {
        workSheet.addRow(Object.values(appointment)).fill = {
          type: 'pattern',
          pattern: 'lightDown',
          bgColor: { argb: '008080' },
        };
      } else {
        workSheet.addRow(Object.values(appointment));
      }
    });

    let fileName = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getHours()}_${date.getSeconds()}_${date.getMilliseconds()}`;
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => saveAs(new Blob([buffer]), `${fileName}.xlsx`))
      .catch((err) => console.log('Error writing excel export', err));
  }
}
