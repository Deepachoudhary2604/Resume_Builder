const dummyResumeData = [
  {
    _id: "dummy-id-1",
    title: "Software Engineer",
    public: false,
    template: "classic",
    accent_color: "#22c55e",
    professional_summary: "Experienced software engineer with a passion for building scalable web applications.",
    skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    personal_info: {
      image: "",
      full_name: "John Doe",
      profession: "Full Stack Developer",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/johndoe",
      website: "https://johndoe.dev"
    },
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        start_date: "2020-01",
        end_date: "2023-12",
        description: "Led a team of 5 developers to build scalable SaaS products."
      }
    ],
    project: [
      {
        name: "ResumeAI",
        type: "Web Application",
        description: "An AI-powered resume builder and ATS analyzer."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        graduation_date: "2019-05",
        gpa: "3.8"
      }
    ]
  }
];

export default dummyResumeData;
