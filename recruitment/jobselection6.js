let applicants = []; // Initialize applicants as an empty array
let filteredApplicants = []; // Initialize a separate array for filtered applicants
let currentApplicantIndex = 0; // Initialize the current applicant index

// Function to display the current applicant's details
function displayCurrentApplicant() {
  const applicantContainer = document.getElementById('applicant-container');
  const applicant = filteredApplicants[currentApplicantIndex];
  console.log(applicant);

  if (applicant) {
    // Create the header section with Name, Applied For, and Image (if available)
    const header = document.createElement('div');
    header.classList.add('header');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    const name = document.createElement('h2');
    name.textContent = applicant.basics.name;

    const appliedFor = document.createElement('p');
    appliedFor.textContent = 'Applied For: ' + applicant.basics.AppliedFor;

    infoContainer.appendChild(name);
    infoContainer.appendChild(appliedFor);

    // Append an image (if available) or the default image
    const image = document.createElement('img');
    if (applicant.basics.image) {
      image.src = applicant.basics.image;
    } /* else {
      image.src = './cv-icon.jpg';
      image.alt = 'CV Icon';
      image.classList.add('right-floated');
    } */

    // Append the info container and the image
    header.appendChild(infoContainer);
    // header.appendChild(image);

    // Create the left side section for Personal Information, Technical Skills, and Hobbies
    const leftSide = document.createElement('div');
    leftSide.classList.add('left-side');

    const personalInfo = document.createElement('div');
    personalInfo.classList.add('section');
    personalInfo.innerHTML = `
            <h3>Personal Information</h3>
            <p>${applicant.basics.phone}</p>
            <p>${applicant.basics.email}</p>
            <p>Network: ${applicant.basics.profiles.network}</p>
        `;

    const technicalSkills = document.createElement('div');
    technicalSkills.classList.add('section');
    technicalSkills.innerHTML = `
            <h3>Technical Skills</h3>
            <p> ${applicant.skills.keywords[0]}</p> 
            <p> ${applicant.skills.keywords[1]}</p>
            <p> ${applicant.skills.keywords[2]}</p>
        `;

    const hobbies = document.createElement('div');
    hobbies.classList.add('section');
    hobbies.innerHTML = `
            <h3>Hobbies</h3>
            <p>${applicant.interests.hobbies[0]}</p>
            <p>${applicant.interests.hobbies[1]}</p>
            <p>${applicant.interests.hobbies[2]}</p>
        `;

    leftSide.appendChild(personalInfo);
    leftSide.appendChild(technicalSkills);
    leftSide.appendChild(hobbies);

    // Create the main panel for Work Experience, Projects, Education, Internship, and Achievements
    const mainPanel = document.createElement('div');
    mainPanel.classList.add('main-panel');

    const workExperience = document.createElement('div');
    workExperience.classList.add('section');
    workExperience.innerHTML = `
            <h3>Work Experience in previous Company</h3>
            <p>Company Name: ${applicant.work['Company Name']}</p>
            <p>Position: ${applicant.work.Position}</p>
            <p>Start Date: ${applicant.work['Start Date']}</p>
            <p>End Date: ${applicant.work['End Date']}</p>
            <p>Summary: ${applicant.work.Summary}</p>
        `;

    const projects = document.createElement('div');
    projects.classList.add('section');
    projects.innerHTML = `
            <h3>Projects</h3>
            <p>${applicant.projects.name}: ${applicant.projects.description}</p> 
            
        `;

    const education = document.createElement('div');
    education.classList.add('section');
    education.innerHTML = `
            <h3>Education</h3>
            
            <p>UG: ${applicant.education.UG.institute}, ${applicant.education.UG.course}, ${applicant.education.UG['Start Date']}, ${applicant.education.UG['End Date']}, ${applicant.education.UG.cgpa}  </p>
            
            
            <p>PU: ${applicant.education['Senior Secondary'].institute},${applicant.education['Senior Secondary'].cgpa} </p>
            
            <p>High School: ${applicant.education['High School'].institute}, ${applicant.education['High School'].cgpa}</p>
            
        `;

    const Internship = document.createElement('div');
    Internship.classList.add('section');
    if (applicant.Internship) {
      Internship.innerHTML = `
            <h3>Internship</h3>
            <p>Company Name: ${applicant.Internship['Company Name']}</p>
            <p>Position: ${applicant.Internship.Position}</p>
            <p>Start Date: ${applicant.Internship['Start Date']}</p>
            <p>End Date: ${applicant.Internship['End Date']}</p>
            <p>Summary: ${applicant.Internship.Summary}</p>
        
        `;
    } else {
      Internship.innerHTML = `
            <h3>Internship</h3>
        <p>No Internship details Available</p> 
            `;
    }

    const achievements = document.createElement('div');
    achievements.classList.add('section');
    achievements.innerHTML = `
            <h3>Achievements</h3>
            <p>${applicant.achievements.Summary}</p>
        `;

    mainPanel.appendChild(workExperience);
    mainPanel.appendChild(projects);
    mainPanel.appendChild(education);
    mainPanel.appendChild(Internship);
    mainPanel.appendChild(achievements);

    // Clear the applicant container and append the sections
    applicantContainer.innerHTML = '';
    applicantContainer.appendChild(header);
    applicantContainer.appendChild(leftSide);
    applicantContainer.appendChild(mainPanel);
  } else {
    // Handle the case when the applicant is not found
    applicantContainer.innerHTML = 'Applicant not found.';
  }
}

// Fetch the JSON file and populate the applicants array
fetch('jobselection6.json')
  .then((response) => response.json())
  .then((data) => {
    applicants = data.resume; // Populate the applicants array with data
    filteredApplicants = applicants; // Initially, set filteredApplicants to all applicants

    // Display the initial applicant
    displayCurrentApplicant();

    // Check the contents of the applicants array
    console.log(applicants);

    // Add event listener to the search button
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
      const jobSearch = document
        .getElementById('job-search')
        .value.toLowerCase();
      filteredApplicants = applicants.filter(
        (applicant) => applicant.basics.AppliedFor.toLowerCase() === jobSearch,
      );

      if (filteredApplicants.length === 0) {
        alert('Invalid search or No applications for this job');
      } else {
        currentApplicantIndex = 0;
        displayCurrentApplicant();

        // Check if there is only one result
        if (filteredApplicants.length === 1) {
          previousButton.style.display = 'hidden';
          nextButton.style.display = 'hidden';
        } else {
          previousButton.style.display = 'inline-block';
          nextButton.style.display = 'inline-block';
        }
        // Update button state after setting display properties
        updateButtonState();
      }
    });
  })
  .catch((error) => console.error(error));

//  event listeners for Next and Previous buttons
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

previousButton.addEventListener('click', () => {
  if (currentApplicantIndex > 0) {
    currentApplicantIndex--;
    displayCurrentApplicant();
    updateButtonState();
  }
  // Enable or disable the buttons based on whether there is a previous record
});

nextButton.addEventListener('click', () => {
  console.log(`Before increment: ${currentApplicantIndex}`);
  if (currentApplicantIndex < filteredApplicants.length - 1) {
    currentApplicantIndex++;
    console.log(`After increment: ${currentApplicantIndex}`);
    displayCurrentApplicant();
    updateButtonState();
  }
  // Enable or disable the buttons based on whether there is a next record
});

// Function to update the state of "Previous" and "Next" buttons
function updateButtonState() {
  previousButton.disabled = currentApplicantIndex === 0; // Disable "Previous" if at the first record
  nextButton.disabled = currentApplicantIndex === filteredApplicants.length - 1; // Disable "Next" if at the last record
}

// Update button state initially
updateButtonState();
