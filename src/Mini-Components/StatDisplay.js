import React from 'react'
import '../styles/StatDisplay.css'

export default function StatDisplay({ label, value, modifier }) {
    return (
        <div className='statDisplay'>
            <div className="numbers">
                <div className="statValue">{value}</div>
                <div className="statValue" id="middleStatDisplay">{modifier}</div>
            </div>
            <div className="labels">
                <div className="statLabel">{label}</div>
                <div className="statLabel">Mod</div>
            </div>
        </div>
    )
}