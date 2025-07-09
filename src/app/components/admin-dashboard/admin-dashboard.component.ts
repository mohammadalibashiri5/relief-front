import {Component} from '@angular/core';
import {NgClass, NgFor} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    NgClass,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  /*dashboardLinks = [
    { name: 'Article Management', path: '/articles/panel' , img : 'https://cdni.iconscout.com/illustration/premium/thumb/article-writing-illustration-download-in-svg-png-gif-file-formats--blogger-logo-content-copywriting-paper-online-seo-ppc-pack-business-illustrations-4708049.png?f=webp' },
    { name: 'CategoryType Management', path: '/admin/article-management' , img: 'https://www.virtualemdr.com/uploads/articles//73c6dc901a6a274d730b5f89e4887f59.png'},
    { name: 'Addiction', path: '/admin/statistics', img: 'https://e7.pngegg.com/pngimages/402/551/png-clipart-rewired-a-bold-new-approach-to-addiction-and-recovery-book-management-organization-learning-communication-thinking-logo-innovation.png' },
    { name: 'Settings', path: '/admin/settings' , img: 'https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/setting-19.png'}
  ]
  */

  dashboardLink = [
    {
      name: 'Articles',
      path: '/articles/panel',
      icon: 'bi-file-earmark-richtext',
      description: 'Manage all published articles and content',
      color: 'bg-gradient-primary'
    },
    {
      name: 'Category Types',
      path: '/categoryType',
      icon: 'bi-heart-pulse',
      description: 'Configure different addiction categories',
      color: 'bg-gradient-danger'
    },
    {
      name: 'Addiction Management',
      path: '/admin/addictions',
      icon: 'bi-shield-plus',
      description: 'Manage treatment programs and resources',
      color: 'bg-gradient-success'
    }
  ];

}
