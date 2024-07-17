import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.module').then((m) => m.DoctorsModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then((m) => m.BillingModule),
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'records',
    loadChildren: () =>
      import('./records/records.module').then((m) => m.RecordsModule),
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.module').then((m) => m.AmbulanceModule),
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./pharmacy/pharmacy.module').then((m) => m.PharmacyModule),
  },
  {
    path: 'centers',
    loadChildren: () =>
      import('./centers/centers.module').then((m) => m.CentersModule),
  },
  {
    path: 'areas',
    loadChildren: () =>
      import('./areas/areas.module').then((m) => m.AreasModule),
  },
  {
    path: 'specialty',
    loadChildren: () =>
      import('./specialty/specialty.module').then((m) => m.SpecialtyModule),
  },
  {
    path: 'slides',
    loadChildren: () =>
      import('./slides/slides.module').then((m) => m.SlidesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'WebSettings',
    loadChildren: () =>
      import('./web-settings/web-settings.module').then(
        (m) => m.WebSettingsModule
      ),
  },
  {
    path: 'MobileSettings',
    loadChildren: () =>
      import('./mobile-settings/mobile-settings.module').then(
        (m) => m.MobileSettingsModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'booking/offline',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./doctor-schedule/doctor-schedule.module').then(
        (m) => m.DoctorScheduleModule
      ),
  },
  {
    path: 'service',
    loadChildren: () =>
      import('./service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'serviceGroup',
    loadChildren: () =>
      import('./service-group/service-group.module').then(
        (m) => m.ServiceGroupModule
      ),
  },
  {
    path: 'promotion',
    loadChildren: () =>
      import('./promotion/promotion.module').then((m) => m.PromotionModule),
  },
  {
    path: 'Board',
    loadChildren: () =>
      import('./new-employees/new-employees.module').then(
        (m) => m.NewEmployeesModule
      ),
  },
  {
    path: 'career',
    loadChildren: () =>
      import('./career/career.module').then((m) => m.CareerModule),
  },
  {
    path: 'dental/service',
    loadChildren: () =>
      import('./dental-service/dental-service.module').then(
        (m) => m.DentalServiceModule
      ),
  },
  {
    path: 'Pics',
    loadChildren: () =>
      import('./hospital-pics/hospital-pics.module').then(
        (m) => m.HospitalPicsModule
      ),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.module').then((m) => m.BlogsModule),
  },
  {
    path: 'booking/online',
    loadChildren: () =>
      import('./online-booking/online-booking.module').then(
        (m) => m.OnlineBookingModule
      ),
  },
  {
    path: 'homeVisit',
    loadChildren: () =>
      import('./home-visit/home-visit.module').then((m) => m.HomeVisitModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
