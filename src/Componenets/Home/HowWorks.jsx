import React from "react";
import Procedure from "./Procedure";

const HowWorks = () => {
  const procedureList = [
    {
      title: "1. What is Code Cloud?",
      details:
        "Code Cloud is an online platform where users can purchase and access a wide range of courses on various topics. It allows instructors to create, publish, and sell courses, while learners can browse, enroll, and study at their own pace.",
    },
    {
      title: "2. How do I create an account?",
      details: `To create an account, click on the "Sign Up" button on the homepage, enter your details, and verify your email address. Once registered, you can start purchasing courses or, if you’re an instructor, creating courses.`,
    },
    {
      title: "3. How can I purchase a course?",
      details: `To purchase a course:

Browse through the available courses or use the search bar to find specific ones.
Click on the course you want to buy, and then click "Enroll."
Complete the payment process via credit card, PayPal, or other supported payment methods.
Once payment is confirmed, the course will be available in your dashboard.`,
    },
    {
      title: "4. Can I get a refund?",
      details: `Yes, we offer a [number]-day money-back guarantee on all courses. If you're not satisfied, you can request a refund within this period, provided you haven’t completed more than [percentage] of the course content. Please refer to our refund policy for more details.`,
    },
    {
      title: "5. How can I access my courses?",
      details: `After purchasing a course, it will be added to your dashboard. You can access the course materials by logging into your account and navigating to the "My Courses" section.`,
    },

    {
      title: "6. Do I have Interactive Support",
      details:
        "Have questions? Use our built-in discussion forums or join live Q&A sessions with instructors and fellow learners. Get instant help and stay connected throughout your learning journey.",
    },

    {
      title: "7. Is I will get Certificate?",
      details:
        "Complete all course requirements, including quizzes and projects, to earn a verified certificate. You can download your certificate from your dashboard and share it on LinkedIn or with potential employers.",
    },
    {
      title: "8. How can I  stay updated?",
      details:
        "Visit the My Courses section to access your enrolled courses anytime. You can also check for new courses and updates in the Courses section to continue expanding your skills.",
    },
  ];

  return (
    <section>
      <div>
        <h1 className="text-3xl text-center font-bold mt-12">FAQ</h1>
        {procedureList.map((procedure, index) => {
          return <Procedure key={index} work={procedure}></Procedure>;
        })}
      </div>
    </section>
  );
};

export default HowWorks;
