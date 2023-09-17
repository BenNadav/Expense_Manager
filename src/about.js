/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import React, {useEffect} from 'react';
import './About.css'
import TeamMember from './teamMember';
import Maxim from './Maxim.png'
import Ben from './Ben.png'
import Gal from './Gal.png'

// Array of 3 group members.
const teamMembers = [
    {
        name: 'Maxim Petrov',
        role: '3rd year Computer Science Student, Junior Programmer, Team Leader',
        picture: Maxim
    },
    {
        name: 'Ben Nadav',
        role: '3rd Computer Science student, Junior Programmer',
        picture: Ben
    },
    {
        name: 'Gal Dahan',
        role: '3rd Computer Science student, Junior Programmer',
        picture: Gal
    }
];

/*
The "About Us" function provides information about the project and the team members. Within the "About Us" section, there is a mapping function that iterates through the
array of the team members created above. For each team member in the array, it generates a new "Team Member" component. Please note that we represent team members as
objects, and there is a corresponding "Team Member" component for rendering them.
*/
function AboutUs() {
    useEffect(() => {
        document.title = 'About Us';
    }, []);
    return (
        <div className="about-us-container">
            <h1 className="about-us-text">Our Expense Tracker</h1>
            <p className="about-us-text">We provide you with the perfect way to keep track of your financial expenses.<br/> You can easily enter the Date, Item, Category, Description and Price of your purchases, and have them presented to you in an organized fashion!<br/>The saved transactions will appear in a table below. You can filter by Month and by Year of purchase!</p>
            <h2>Meet the Team</h2>
            <div className="team-members-container">
                {teamMembers.map((member) => (
                    <TeamMember
                        key={member.name}
                        name={member.name}
                        role={member.role}
                        picture={member.picture}
                    />
                ))}
            </div>
        </div>
    );
}

export default AboutUs;