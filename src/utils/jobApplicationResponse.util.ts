export function formatJobApplicationResponse(job, user, newJobApplication) {
  return {
    status_code: 201,
    message: 'Job application successful',
    data: {
      job: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary_range: job.salary_range,
        skills_required: job.skills_required,
        job_type: job.job_type,
        status: job.status,
        company: {
          id: job.company.id,
          name: job.company.name,
          industry: job.company.industry,
          logo: job.company.logo,
          description: job.company.description,
          location: job.company.location,
          company_email: job.company.company_email,
        },
      },
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        cv_link: user.cv_link,
        location: user.location,
        phone_number: user.phone_number,
      },
      location: newJobApplication.location,
      cv_link: newJobApplication.cv_link,
      id: newJobApplication.id,
      created_at: newJobApplication.created_at,
      updated_at: newJobApplication.updated_at,
      status: newJobApplication.status,
      appliedAt: newJobApplication.created_at,
    },
  };
}
