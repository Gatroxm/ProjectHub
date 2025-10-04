import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './schemas/report.schema';

export interface ProductivityMetrics {
  totalHoursWorked: number;
  taskCompletion: number;
  activeProjects: number;
  avgHoursPerTask: number;
  teamUtilization: number;
  completedTasksThisWeek: number;
  onTimeDelivery: number;
}

export interface TeamPerformanceReport {
  teamId: string;
  teamName: string;
  members: Array<{
    userId: string;
    name: string;
    tasksCompleted: number;
    hoursWorked: number;
    efficiency: number;
    onTimeDelivery: number;
  }>;
  totalTasks: number;
  completedTasks: number;
  avgCompletionTime: number;
  teamEfficiency: number;
}

export interface ProjectCostAnalysis {
  projectId: string;
  projectName: string;
  estimatedCost: number;
  actualCost: number;
  variance: number;
  variancePercentage: number;
  hoursEstimated: number;
  hoursActual: number;
  resourceCosts: {
    developers: number;
    designers: number;
    managers: number;
    qa: number;
  };
}

export interface TimelineReport {
  projectId: string;
  projectName: string;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate: Date;
  status: string;
  milestones: Array<{
    name: string;
    plannedDate: Date;
    actualDate: Date;
    status: 'completed' | 'in_progress' | 'delayed' | 'upcoming';
  }>;
  delayDays: number;
  completionPercentage: number;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<Report>,
  ) {}

  async getExecutiveDashboard(tenantId: string): Promise<ProductivityMetrics> {
    // Mock data for demonstration
    return {
      totalHoursWorked: 1240.5,
      taskCompletion: 87.3,
      activeProjects: 8,
      avgHoursPerTask: 6.2,
      teamUtilization: 78.9,
      completedTasksThisWeek: 23,
      onTimeDelivery: 92.1
    };
  }

  async getTeamPerformance(
    tenantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<TeamPerformanceReport[]> {
    // Mock data for demonstration
    return [
      {
        teamId: 'team-1',
        teamName: 'Frontend Team',
        members: [
          {
            userId: 'user-1',
            name: 'Ana García',
            tasksCompleted: 15,
            hoursWorked: 78.5,
            efficiency: 94.2,
            onTimeDelivery: 96.7
          },
          {
            userId: 'user-2',
            name: 'Carlos López',
            tasksCompleted: 12,
            hoursWorked: 72.0,
            efficiency: 88.1,
            onTimeDelivery: 83.3
          }
        ],
        totalTasks: 30,
        completedTasks: 27,
        avgCompletionTime: 5.2,
        teamEfficiency: 91.2
      },
      {
        teamId: 'team-2',
        teamName: 'Backend Team',
        members: [
          {
            userId: 'user-3',
            name: 'María Rodriguez',
            tasksCompleted: 18,
            hoursWorked: 85.0,
            efficiency: 96.8,
            onTimeDelivery: 94.4
          }
        ],
        totalTasks: 25,
        completedTasks: 23,
        avgCompletionTime: 4.8,
        teamEfficiency: 92.0
      }
    ];
  }

  async getProjectCostAnalysis(tenantId: string): Promise<ProjectCostAnalysis[]> {
    // Mock data for demonstration
    return [
      {
        projectId: 'proj-1',
        projectName: 'E-commerce Platform',
        estimatedCost: 45000,
        actualCost: 42300,
        variance: -2700,
        variancePercentage: -6.0,
        hoursEstimated: 450,
        hoursActual: 423,
        resourceCosts: {
          developers: 32000,
          designers: 6000,
          managers: 3000,
          qa: 1300
        }
      },
      {
        projectId: 'proj-2',
        projectName: 'Mobile App',
        estimatedCost: 32000,
        actualCost: 35200,
        variance: 3200,
        variancePercentage: 10.0,
        hoursEstimated: 320,
        hoursActual: 352,
        resourceCosts: {
          developers: 24000,
          designers: 8000,
          managers: 2400,
          qa: 800
        }
      }
    ];
  }

  async getTimelineReport(
    tenantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<TimelineReport[]> {
    // Mock data for demonstration
    return [
      {
        projectId: 'proj-1',
        projectName: 'E-commerce Platform',
        startDate: new Date('2024-01-15'),
        estimatedEndDate: new Date('2024-04-15'),
        actualEndDate: new Date('2024-04-10'),
        status: 'completed',
        milestones: [
          {
            name: 'MVP Release',
            plannedDate: new Date('2024-02-28'),
            actualDate: new Date('2024-03-02'),
            status: 'completed'
          },
          {
            name: 'Beta Testing',
            plannedDate: new Date('2024-03-15'),
            actualDate: new Date('2024-03-18'),
            status: 'completed'
          },
          {
            name: 'Production Release',
            plannedDate: new Date('2024-04-15'),
            actualDate: new Date('2024-04-10'),
            status: 'completed'
          }
        ],
        delayDays: -5,
        completionPercentage: 100
      }
    ];
  }
}