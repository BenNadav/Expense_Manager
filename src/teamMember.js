/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import React from 'react';
function TeamMember({ name, role, picture }) {
    return (
        <div className="team-member-card">
            <img src={picture} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    );
}

export default TeamMember;