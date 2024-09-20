import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendHiredNotification(applicantName: string, userEmail: string, jobTitle: string, companyName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Congratulations! You've been hired for ${jobTitle} at ${companyName}`,
      template: './job-hired-notification',
      context: {
        applicantName,
        jobTitle,
        companyName,
        startDate: '2024-09-29',
      },
    });
  }
  async sendJobApplicationConfirmation(
    applicantName: string,
    userEmail: string,
    jobTitle: string,
    companyName: string
  ) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Your Application for ${jobTitle} at ${companyName}`,
      template: './job-application-confirmation',
      context: {
        applicantName,
        jobTitle,
        companyName,
      },
    });
  }

  async sendJobInterviewSchedule(
    applicantName: string,
    userEmail: string,
    jobTitle: string,
    companyName: string,
    interviewDate: string,
    interviewLocation: string
  ) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Interview Scheduled for ${jobTitle} at ${companyName}`,
      template: './job-interview-schedule',
      context: {
        applicantName,
        jobTitle,
        companyName,
        interviewDate,
        interviewLocation,
      },
    });
  }

  async sendJobApplicationRejection(applicantName: string, userEmail: string, jobTitle: string, companyName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Your Application for ${jobTitle} at ${companyName} - Rejected`,
      template: './job-rejection-notification',
      context: {
        applicantName,
        jobTitle,
        companyName,
      },
    });
  }

  async sendJobOfferNotification(applicantName: string, userEmail: string, jobTitle: string, companyName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Job Offer for ${jobTitle} at ${companyName}`,
      template: './job-offer-notification',
      context: {
        applicantName,
        jobTitle,
        companyName,
      },
    });
  }
}
