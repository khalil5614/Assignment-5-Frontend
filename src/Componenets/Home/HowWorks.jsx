import React from "react";
import Procedure from "./Procedure";

const HowWorks = () => {
  const procedureList = [
    {
      title: "1. Browse Courses",
      details:
        "Explore our wide range of IT training courses by browsing through categories or using the search bar to find the course that best suits your needs. You can filter courses by skill level, technology, or certification path.",
    },
    {
      title: "2. Select a Course",
      details:
        "Click on any course to view detailed information, including the curriculum, instructor details, and course duration. You’ll also find reviews and ratings from other students to help guide your decision.",
    },
    {
      title: "3. Enroll in a Course",
      details:
        "Once you have found the right course, click the Enroll Now button. You can choose between free courses, one-time payments, or subscription-based options depending on the course type.",
    },
    {
      title: "4. Create an Account",
      details:
        "If you’re new, you’ll be prompted to create an account. Simply fill in your name, email, and password to get started. If you already have an account, log in with your existing credentials.",
    },
    {
      title: "5. Start Learning",
      details:
        "Once enrolled, you’ll have immediate access to all course materials, including video tutorials, quizzes, and downloadable resources. You can learn at your own pace and track your progress from your personal dashboard.",
    },

    {
      title: "6. Interactive Support",
      details:
        "Have questions? Use our built-in discussion forums or join live Q&A sessions with instructors and fellow learners. Get instant help and stay connected throughout your learning journey.",
    },

    {
      title: "7. Earn a Certificate",
      details:
        "Complete all course requirements, including quizzes and projects, to earn a verified certificate. You can download your certificate from your dashboard and share it on LinkedIn or with potential employers.",
    },
    {
      title: "8. Stay Updated",
      details:
        "Visit the My Courses section to access your enrolled courses anytime. You can also check for new courses and updates in the Courses section to continue expanding your skills.",
    },
  ];

  //console.log("HowWorks");
  return (
    <section>
      <div>
        <h1 className="text-3xl text-center font-bold mt-12">How it Works</h1>
        {procedureList.map((procedure, index) => {
          return <Procedure key={index} work={procedure}></Procedure>;
        })}
      </div>
    </section>
  );
};

export default HowWorks;
