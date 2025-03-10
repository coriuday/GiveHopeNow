import React from 'react';

interface TestimonialSectionProps {
  maxDisplay?: number;
  backgroundColor?: string;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  maxDisplay = 3,
  backgroundColor = "white"
}) => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "I've been donating to GiveHopeNow for over 2 years. The transparency and impact reports they provide give me confidence that my donations are truly making a difference.",
      name: "Sarah Johnson",
      role: "Regular Donor"
    },
    {
      id: 2,
      text: "As both a donor and volunteer, I've seen firsthand how effectively this organization utilizes resources. Their commitment to sustainable solutions rather than quick fixes is what sets them apart.",
      name: "Michael Rivera",
      role: "Volunteer"
    },
    {
      id: 3,
      text: "The educational initiative funded through GiveHopeNow transformed our local school. Our children now have access to resources they never had before.",
      name: "Emma Chen",
      role: "Project Beneficiary"
    }
  ];

  // Only display the requested number of testimonials
  const displayedTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <section className="section" style={{ backgroundColor }}>
      <div className="container">
        <div className="has-text-centered mb-6">
          <h2 className="title is-3">What People Say</h2>
          <p className="subtitle is-5 has-text-grey">
            Hear from our donors, volunteers, and beneficiaries
          </p>
        </div>

        <div className="columns is-multiline">
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="column is-4">
              <div className="card">
                <div className="card-content">
                  <p className="is-italic has-text-grey mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-5">{testimonial.name}</p>
                      <p className="subtitle is-6 has-text-danger">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 