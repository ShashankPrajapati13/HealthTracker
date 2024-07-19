import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexPlotOptions, ApexYAxis } from 'ng-apexcharts';
import { WorkoutService } from '../workout.service';
import { User } from '../models/user';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

interface WorkoutData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.scss']
})
export class WorkoutProgressComponent implements OnInit, OnDestroy {
  public chartOptions: ChartOptions;
  public users: User[] = [];
  public uniqueUsers: User[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Minutes',
          data: []
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'Workout Progress'
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Minutes'
        },
        labels: {
          formatter: function (val) {
            return Math.round(val).toString();
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          barHeight: '40%',
        }
      }
    };
  }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadUsers();
    });

    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUsers() {
    this.workoutService.users$.subscribe((users: User[]) => {
      this.users = users;
      this.uniqueUsers = Array.from(new Set(users.map(user => user.name)))
        .map(name => users.find(user => user.name === name))
        .filter((user): user is User => !!user); // Filter out undefined values
    });
  }

  selectUser(user: User): void {
    const userWorkouts = this.users.filter(u => u.name === user.name);

    const data: WorkoutData[] = userWorkouts.reduce((acc: WorkoutData[], workout) => {
      const existing = acc.find(item => item.name === workout.type);
      if (existing) {
        existing.value += workout.minutes;
      } else {
        acc.push({ name: workout.type, value: workout.minutes });
      }
      return acc;
    }, []);

    this.chartOptions.series = [
      {
        name: 'Minutes',
        data: data.map(item => item.value)
      }
    ];
    this.chartOptions.xaxis = {
      categories: data.map(item => item.name)
    };

    const maxValue = Math.max(...data.map(item => item.value));
    this.chartOptions.yaxis.max = maxValue + 10;
  }
}
