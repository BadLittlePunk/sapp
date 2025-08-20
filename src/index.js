import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icon Components ---
// To remove external dependencies, icons are defined here as SVG components.

const Icon = ({ name, size = 24, className = '' }) => {
    const icons = {
        Target: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
        X: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
        Lock: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
        Trophy: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M9.17 9a3 3 0 0 0 5.66 0"/></svg>,
        Star: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
        PlayCircle: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
        CheckCircle: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
        Shield: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
        Dribbble: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-2.62-1.2-5.32-2.73-8.25-4.24"/><path d="M4.87 18.91C8.78 14.86 14 13.56 21.75 13.06"/></svg>,
        Zap: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
        User: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
        Bot: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="16" height="8" rx="2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M12 12v.01"/></svg>,
        PauseCircle: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>,
        Youtube: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>,
        Send: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
        Sparkles: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
        ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
        ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
        HeartPulse: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1 2.1 4.4 3.2-7.4H21"/></svg>,
        ClipboardList: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
    };

    const Svg = icons[name];
    if (!Svg) return null;

    return React.cloneElement(Svg, {
        width: size,
        height: size,
        className: className,
    });
};


// --- DATA STORE ---

const skillsData = [
    // Foundational Dribbling
    { name: "Stepover", description: "Feint by swinging your leg over the ball without touching it, then take the ball in the opposite direction with your other foot.", category: "1v1 Moves", videoUrl: "https://www.youtube.com/watch?v=y1UJrlWu7J8" },
    { name: "Body Feint", description: "Drop your shoulder and shift your body weight to pretend you're going one way, then quickly exit in the other direction.", category: "1v1 Moves", videoUrl: "https://www.youtube.com/watch?v=N-HbFSguyjk" },
    { name: "La Croqueta", description: "A quick two-touch move, tapping the ball from one foot to the other to bypass a defender in tight spaces.", category: "1v1 Moves", videoUrl: "https://www.youtube.com/watch?v=LYaNYO87j_U" },
    { name: "Cruyff Turn", description: "Pretend to pass or shoot, but instead, drag the ball behind your standing leg with the inside of your foot and accelerate away.", category: "Turning", videoUrl: "https://www.youtube.com/watch?v=LRSUw7mgqAY" },
    { name: "Maradona Spin", description: "A 360-degree spin on the ball, shielding it from the defender as you turn.", category: "Turning", videoUrl: "https://www.youtube.com/watch?v=BqZfsuMw9r0" },
    { name: "Ball Roll", description: "Use the sole of your foot to roll the ball across your body, changing its direction.", category: "Control", videoUrl: "https://www.youtube.com/watch?v=a9m4TVuvNbE" },
    { name: "Stop and Go", description: "Come to a sudden stop with the ball, making the defender pause, then explode into space.", category: "1v1 Moves", videoUrl: "https://www.youtube.com/watch?v=-W4CSIntI6E" },
    
    // Intermediate Flair
    { name: "Elastico", description: "Push the ball out with the outside of your foot and quickly bring it back with the inside, wrong-footing the defender.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=1_D_U-T8b_M" },
    { name: "Reverse Elastico", description: "The opposite of an elastico: push the ball with the inside of your foot and snap it back with the outside.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=czbL-1R86nw" },
    { name: "Nutmeg", description: "Kicking the ball through an opponent's legs.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=JBUkqdsaidc" },
    { name: "The V-Pull", description: "Pull the ball back towards you with the sole of your foot, then push it out in a 'V' shape with the inside or outside of the same foot.", category: "Turning", videoUrl: "https://www.youtube.com/watch?v=uCz9FZu-GCw" },
    { name: "Scoop Turn", description: "A variation of the Cruyff turn where you use the inside of your foot to 'scoop' the ball behind your standing leg.", category: "Turning", videoUrl: "https://www.youtube.com/watch?v=EHk635lx5A4" },
    { name: "Bolasie Flick", description: "Flick the ball up with one foot, then use the other leg to knock it over a defender's head while in the air.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=kLVUsoCjVE4" },
    { name: "McGeady Spin", description: "A combination of a stepover and a spin, used to sharply change direction.", category: "Turning", videoUrl: "https://www.youtube.com/watch?v=qIB76HqVaHE" },

    // Advanced Flair
    { name: "Sombrero Flick", description: "Flick the ball up and over an opponent's head, then run around them to collect it.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=wNmz-b23g5k" },
    { name: "Rabona", description: "Kicking the ball where the kicking leg is wrapped around the back of the standing leg. Used for surprising crosses or shots.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=NpcDYBSHEcY" },
    { name: "Hocus Pocus", description: "A complex trick involving rolling the ball and wrapping your leg around it to change direction.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=qmrEKVVun10" },
    { name: "Around the World", description: "While juggling, circle your foot around the ball in mid-air without touching it.", category: "Juggling", videoUrl: "https://www.youtube.com/watch?v=KbSVHJ1ZLbg" },
    { name: "Akka 3000", description: "A street soccer move where you use your standing foot to trap the ball and flick it through a defender's legs.", category: "Flair", videoUrl: "https://www.youtube.com/watch?v=zeHHCVgVCcY" },
];

const drillsByPosition = {
    "Forward": [
        { unit: 1, name: "Sharp Shooting", description: "Place a ball 20 yards from goal. Approach at a slight angle. Strike with your laces, keeping your head and chest over the ball to keep it low. Focus on hitting the corners of the goal. Take 20 shots.", duration: 120, category: "Shooting" },
        { unit: 1, name: "First-Touch Finishing", description: "Toss a ball against a wall or rebounder so it comes back towards you. Without stopping it, strike it first-time towards a target goal. This simulates finishing from a pass. 20 reps.", duration: 120, category: "Shooting" },
        { unit: 1, name: "Dribble & Shoot", description: "Set up a cone 25 yards out. Dribble at speed towards it, perform a skill move (like a stepover) to 'beat' it, take one touch to set yourself, and then shoot. 15 reps.", duration: 150, category: "Dribbling" },
        { unit: 1, name: "Milestone: Finishing Basics", isMilestone: true },
        { unit: 2, name: "Volley Practice", description: "Toss the ball in the air in front of you. As it drops, strike it on the volley before it bounces. Keep your eye on the ball and your knee over it to control the direction. 20 volleys.", duration: 120, category: "Shooting" },
        { unit: 2, name: "Finesse Curling", description: "From the edge of the 18-yard box, practice curling the ball into the far corner. Use the inside of your foot, wrapping it around the ball to generate spin. 20 shots.", duration: 120, category: "Shooting" },
        { unit: 2, name: "Weak Foot Shooting", description: "Repeat the Stationary Shooting drill, but using only your weaker foot. It's okay to miss, focus on clean technique. 20 shots.", duration: 150, category: "Shooting" },
        { unit: 2, name: "Milestone: Advanced Shots", isMilestone: true },
        { unit: 3, name: "Hold-up & Turn", description: "Pass the ball against a sturdy wall. As it returns, shield it with your body as if a defender is behind you. Take a touch and turn sharply to your left or right. 20 reps.", duration: 120, category: "Control" },
        { unit: 3, name: "Off-ball Movement", description: "Set up 4 cones in a large square. Practice explosive movements between them: check your shoulder, sprint to a cone, curve your run to the next, check again. This simulates finding space in the box.", duration: 90, category: "Movement" },
        { unit: 3, name: "Reactive Finishing", description: "Stand facing a wall. Throw the ball against it and react to the rebound, controlling and shooting at a target as quickly as possible. Improves reactions.", duration: 90, category: "Shooting" },
    ],
    "Midfielder": [
        { unit: 1, name: "Foundation Touches", description: "Gently tap the ball back and forth between the inside of your feet. Stay light on your toes. The goal is to get as many touches as possible to build ball familiarity.", duration: 120, category: "Control" },
        { unit: 1, name: "Cone Weaving", description: "Set up 8 cones in a line. Dribble through them using both feet, taking a touch with every step. This is about precision, not speed.", duration: 120, category: "Dribbling" },
        { unit: 1, name: "Two-Touch Wall Passing", description: "Stand 5 yards from a wall. Pass the ball against it. Control the rebound with your first touch, setting it up for your second touch to pass it back. Alternate feet.", duration: 120, category: "Passing" },
        { unit: 1, name: "Milestone: Core Control", isMilestone: true },
        { unit: 2, name: "Long Pass Accuracy", description: "Create a 5x5 yard square with cones 30 yards away. Practice hitting driven and lofted passes into this target area. Focus on your technique.", duration: 150, category: "Passing" },
        { unit: 2, name: "Receive & Turn", description: "Pass against a wall. As the ball returns, open your body and receive it with your back foot, turning towards open space in one motion. Crucial for awareness.", duration: 120, category: "Control" },
        { unit: 2, name: "Scanning Practice", description: "Dribble slowly in a circle. Every two touches, quickly glance over both shoulders to see the space around you. This builds a vital habit.", duration: 90, category: "Awareness" },
        { unit: 2, name: "Milestone: Vision & Range", isMilestone: true },
        { unit: 3, name: "Figure Eights Dribbling", description: "Set up two cones 5 yards apart. Dribble in a figure-eight pattern around them. Focus on using different surfaces of your feet to navigate the turns.", duration: 120, category: "Dribbling" },
        { unit: 3, name: "One-Touch Wall Passing", description: "Stand closer to the wall (3 yards). Pass the ball against it using only one touch, alternating feet. This improves your speed of play.", duration: 90, category: "Passing" },
        { unit: 3, name: "First Touch Away From Pressure", description: "Stand with your back to a wall. Toss the ball over your shoulder so it bounces off the wall. As it comes to you, take your first touch away from the 'defender' (the wall) into space.", duration: 120, category: "Control" },
    ],
    "Defender": [
        { unit: 1, name: "Defensive Stance & Shuffles", description: "Without a ball, practice your defensive stance. Stay low, on the balls of your feet, with a slight side-on body shape. Shuffle side-to-side for 10 yards and back.", duration: 90, category: "Defending" },
        { unit: 1, name: "Tackling a Cone", description: "Place a cone to act as the ball. Approach it as you would an attacker and practice a clean standing tackle to poke it away. Focus on timing and balance.", duration: 90, category: "Defending" },
        { unit: 1, name: "Wall Clearances", description: "Kick the ball firmly against a wall from 15 yards. As it rebounds, practice clearing it first-time with different surfaces of your foot, aiming for distance and height.", duration: 120, category: "Defending" },
        { unit: 1, name: "Milestone: Defensive Basics", isMilestone: true },
        { unit: 2, name: "Heading Practice", description: "Toss the ball in the air. Practice jumping to meet it at the highest point and heading it for distance. Focus on using your forehead and keeping your neck strong.", duration: 120, category: "Defending" },
        { unit: 2, name: "Jockeying Backwards", description: "Set up two cones 15 yards apart. Practice jockeying backwards from one to the other, staying low and on your toes the whole time. This builds defensive endurance.", duration: 90, category: "Defending" },
        { unit: 2, name: "Blocking Stance", description: "Imagine a shot is coming. Practice rushing out a few steps and making your body as big as possible, turning slightly sideways to protect yourself while maximizing blocking area.", duration: 60, category: "Defending" },
        { unit: 2, name: "Milestone: Aerial & Ground Duels", isMilestone: true },
        { unit: 3, name: "Turn and Sprint", description: "Stand facing one way. On a self-shouted command, turn 180 degrees and sprint 10 yards. This simulates reacting to a ball played in behind you.", duration: 90, category: "Movement" },
        { unit: 3, name: "Shielding the Ball", description: "Roll the ball towards a wall or corner. Get your body between the 'opponent' (the wall) and the ball, using your arms and body to shield it for 5-10 seconds.", duration: 120, category: "Control" },
        { unit: 3, name: "Long Ball Control", description: "Kick the ball high into the air. As it comes down, practice controlling it with your first touch, bringing it down dead at your feet.", duration: 120, category: "Control" },
    ],
    "Goalkeeper": [
        { unit: 1, name: "Basic Handling", description: "Throw a ball against a wall. Practice catching it cleanly, focusing on the 'W' hand shape behind the ball and absorbing the pace by bringing it into your body.", duration: 120, category: "Goalkeeping" },
        { unit: 1, name: "Low Dives", description: "Roll a ball just out of reach to your left and right. Practice diving low, getting your body behind the ball, and securing it with both hands.", duration: 120, category: "Goalkeeping" },
        { unit: 1, name: "Footwork Drills", description: "Set up a small ladder or cones. Practice quick feet movements: shuffling side to side, moving forwards and backwards, to improve your agility in the goal.", duration: 90, category: "Goalkeeping" },
        { unit: 1, name: "Milestone: Foundational Skills", isMilestone: true },
        { unit: 2, name: "Reaction Saves", description: "Stand 5 yards from a wall. Throw the ball hard against it and react to save the unpredictable rebound. This sharpens your reflexes.", duration: 90, category: "Goalkeeping" },
        { unit: 2, name: "Distribution Throws", description: "Practice throwing the ball (rolling and overarm) towards a target cone 30 yards away. Focus on accuracy and technique.", duration: 120, category: "Goalkeeping" },
        { unit: 2, name: "High Ball Catches", description: "Throw the ball high above your head. Practice moving your feet to get under it, jumping, and catching it at the highest possible point. Shout 'Keeper!' as you do.", duration: 120, category: "Goalkeeping" },
        { unit: 2, name: "Milestone: Handling & Distribution", isMilestone: true },
        { unit: 3, name: "Shot Stopping (Wall)", description: "Kick the ball hard against a wall from 10 yards. Practice setting your feet and making saves from the rebound, focusing on strong hands.", duration: 120, category: "Goalkeeping" },
        { unit: 3, name: "Coming Off Your Line", description: "Place a ball 10 yards in front of your goal. Start on your line, then sprint out to the ball, get down low, and smother it. This simulates a 1v1.", duration: 90, category: "Goalkeeping" },
        { unit: 3, name: "Distribution Kicks", description: "Practice goal kicks and punts, aiming for a large target area 50-60 yards away. Focus on striking the ball cleanly for distance and height.", duration: 120, category: "Goalkeeping" },
    ]
};

const visualizationData = {
    "Forward": [
        { title: "1-on-1 with the Keeper", description: "You've broken through the defensive line. It's just you and the goalkeeper.", script: "Close your eyes. Visualize five different ways you could score in this situation." },
        { title: "Back to Goal", description: "You've received a firm pass into your feet with your back to the goal, on the edge of the 18-yard box. A defender is tight on your back.", script: "Close your eyes. Visualize three different ways you could turn and get a shot off." },
    ],
    "Midfielder": [
        { title: "The Counter-Attack", description: "You've just won the ball back in your own half. You lift your head and see three of your teammates making runs forward into the opponent's territory.", script: "Close your eyes. Visualize the perfect pass to launch the counter-attack. See the ball's path, its pace, and the successful outcome." },
        { title: "Escaping Pressure", description: "You're about to receive a pass in a crowded midfield. Two opponents are closing you down instantly.", script: "Close your eyes. Visualize five different ways you could use your first touch to escape the pressure and keep possession for your team." },
    ],
    "Defender": [
        { title: "The Last-Ditch Tackle", description: "A fast winger has just knocked the ball past your fullback and is sprinting down the line towards your goal. You are the only one who can cover across.", script: "Close your eyes. Visualize the angle of your run and the perfect moment to make a clean, successful slide tackle." },
        { title: "Facing a 2-on-1", description: "The opposition is breaking on a 2-on-1 counter-attack. You are the only defender back. They are running straight at you.", script: "Close your eyes. Visualize your body positioning and movement to slow them down, block the passing lane, and prevent a shot until help arrives." },
    ],
    "Goalkeeper": [
        { title: "The Penalty Shootout", description: "The game has gone to a penalty shootout. You are in goal. The striker places the ball on the spot and begins their run-up.", script: "Close your eyes. Visualize making the game-winning save. See their run-up, read their body language, and feel the explosive dive." },
        { title: "Through-Ball Threat", description: "You see the opponent's midfielder look up, ready to play a through-ball for their striker to run onto. You have a split second to decide: stay on your line or come out to intercept.", script: "Close your eyes. Visualize the situation and make the correct decision. See yourself sprinting off your line to clear the danger just in time." },
    ]
};

const allDrills = Object.values(drillsByPosition).flat().filter(d => !d.isMilestone);

const achievementsData = [
    { id: 'first_drill', name: 'First Steps', description: 'Complete your first drill.', criteria: { type: 'drills', value: 1 } },
    { id: 'drill_5', name: 'Getting Serious', description: 'Complete 5 drills.', criteria: { type: 'drills', value: 5 } },
    { id: 'streak_3', name: 'On Fire!', description: 'Maintain a 3-day streak.', criteria: { type: 'streak', value: 3 } },
    { id: 'streak_7', name: 'Unstoppable', description: 'Maintain a 7-day streak.', criteria: { type: 'streak', value: 7 } },
    { id: 'xp_100', name: 'XP Collector', description: 'Earn 100 XP.', criteria: { type: 'xp', value: 100 } },
];

// --- TACTICS DATA ---
const formationsData = {
    "4-4-2": {
        name: "4-4-2",
        description: "A classic, balanced formation known for its defensive stability and simple structure.",
        players: [
            { id: 'GK', name: 'Goalkeeper', top: '92%', left: '50%', role: '**Core Responsibility:** Prevent goals and organize the defense.\n\n**In Attack:** Distribute the ball quickly and accurately to start counter-attacks.\n\n**In Defense:** Command your penalty area, especially on crosses. Communicate constantly with your back four.\n\n**Key to Success:** Strong shot-stopping and clear, confident communication.' },
            { id: 'RB', name: 'Right Back', top: '75%', left: '88%', role: '**Core Responsibility:** Defend the right flank and support attacks.\n\n**In Attack:** Overlap the right midfielder to provide width and deliver crosses.\n\n**In Defense:** Mark the opposing left winger. Do not let them get behind you.\n\n**Key to Success:** High stamina to cover the entire flank for 90 minutes.' },
            { id: 'LB', name: 'Left Back', top: '75%', left: '12%', role: '**Core Responsibility:** Defend the left flank and support attacks.\n\n**In Attack:** Overlap the left midfielder to create 2v1 situations.\n\n**In Defense:** Mark the opposing right winger. Maintain a strong defensive line with the center backs.\n\n**Key to Success:** Balancing defensive duties with attacking runs. Timing is everything.' },
            { id: 'RCB', name: 'Right Center Back', top: '80%', left: '65%', role: '**Core Responsibility:** Stop central attacks and mark a striker.\n\n**In Attack:** Provide a safe passing option to recycle possession.\n\n**In Defense:** Win headers and tackles. Cover the space behind the right back if they push forward.\n\n**Key to Success:** Strength, aerial dominance, and a strong partnership with the other center back.' },
            { id: 'LCB', name: 'Left Center Back', top: '80%', left: '35%', role: '**Core Responsibility:** Stop central attacks and mark a striker.\n\n**In Attack:** Often the ball-playing defender, capable of starting attacks with passes to the midfield.\n\n**In Defense:** Maintain positioning, intercept passes, and organize the defensive line.\n\n**Key to Success:** Reading the game to anticipate danger and being composed on the ball.' },
            { id: 'RM', name: 'Right Midfielder', top: '50%', left: '85%', role: '**Core Responsibility:** Provide width on the right side in both attack and defense.\n\n**In Attack:** Take on the opposing left back, deliver crosses for the two strikers.\n\n**In Defense:** Track back to support your right back and prevent overloads.\n\n**Key to Success:** Excellent crossing ability and a high work rate.' },
            { id: 'LM', name: 'Left Midfielder', top: '50%', left: '15%', role: '**Core Responsibility:** Provide width on the left side in both attack and defense.\n\n**In Attack:** Dribble at defenders and supply the strikers with chances.\n\n**In Defense:** Help your left back defensively, forming a solid bank of four in midfield.\n\n**Key to Success:** 1v1 dribbling skills and defensive discipline.' },
            { id: 'RCM', name: 'Right Center Mid', top: '55%', left: '60%', role: '**Core Responsibility:** Control the center of the pitch; a box-to-box engine.\n\n**In Attack:** Support the strikers, make late runs into the box, and take long shots.\n\n**In Defense:** Win the ball back, press the opposition, and protect the defense.\n\n**Key to Success:** Incredible stamina and a complete range of passing.' },
            { id: 'LCM', name: 'Left Center Mid', top: '55%', left: '40%', role: '**Core Responsibility:** Dictate the tempo of the game and create chances.\n\n**In Attack:** Play through-balls to the strikers and switch the point of attack.\n\n**In Defense:** Maintain team shape and intercept passes.\n\n**Key to Success:** Vision, creativity, and passing accuracy.' },
            { id: 'RS', name: 'Right Striker', top: '20%', left: '60%', role: '**Core Responsibility:** Score goals and create space for your partner.\n\n**In Attack:** Run the channels, stretch the defense with your speed, and be ready to shoot on sight.\n\n**In Defense:** Be the first line of defense by pressing the opposition center backs.\n\n**Key to Success:** Pace, intelligent movement, and clinical finishing.' },
            { id: 'LS', name: 'Left Striker', top: '20%', left: '40%', role: '**Core Responsibility:** Score goals and link up play.\n\n**In Attack:** Hold up the ball, bring midfielders into the attack, and be a physical presence in the box.\n\n**In Defense:** Prevent easy passes out from the back by the opposition.\n\n**Key to Success:** Strength to hold off defenders and poaching instincts in the box.' },
        ]
    },
    "4-3-3": {
        name: "4-3-3",
        description: "An attack-minded formation that utilizes wide forwards to stretch the opposition defense.",
        players: [
            { id: 'GK', name: 'Goalkeeper', top: '92%', left: '50%', role: '**Core Responsibility:** Standard goalkeeping duties with an emphasis on distribution.\n\n**In Attack:** Act as the starting point, playing short to defenders or long to wingers.\n\n**In Defense:** Must be comfortable dealing with through-balls in the large space behind a high defensive line.\n\n**Key to Success:** Good feet and decision-making under pressure.' },
            { id: 'RB', name: 'Right Back', top: '78%', left: '88%', role: '**Core Responsibility:** Provide defensive solidity and support the winger.\n\n**In Attack:** Support the right winger, sometimes overlapping but often holding a deeper position to allow the winger to be the main attacker.\n\n**In Defense:** Mark the opposing left winger tightly. Must be athletic to handle fast attackers.\n\n**Key to Success:** Strong 1v1 defending skills.' },
            { id: 'LB', name: 'Left Back', top: '78%', left: '12%', role: '**Core Responsibility:** Balance defensive duties with joining the attack.\n\n**In Attack:** Provide an overlapping option to create width and stretch the defense.\n\n**In Defense:** Mark the opposing right winger and tuck in to support the center backs.\n\n**Key to Success:** Good crossing ability and recovery pace.' },
            { id: 'RCB', name: 'Right Center Back', top: '82%', left: '65%', role: '**Core Responsibility:** Anchor the defense.\n\n**In Attack:** Be comfortable on the ball to start passing sequences.\n\n**In Defense:** Must be dominant in the air and a strong tackler. Covers the space behind the attacking right back.\n\n**Key to Success:** Concentration and physical presence.' },
            { id: 'LCB', name: 'Left Center Back', top: '82%', left: '35%', role: '**Core Responsibility:** Read the game and intercept threats.\n\n**In Attack:** Often the defender more comfortable carrying the ball forward if space opens up.\n\n**In Defense:** Excellent positioning is crucial to cut out passes aimed at the striker.\n\n**Key to Success:** Tactical intelligence and composure.' },
            { id: 'DM', name: 'Defensive Mid', top: '65%', left: '50%', role: '**Core Responsibility:** Shield the defense and control the tempo from deep.\n\n**In Attack:** Be the pivot point for the team, always available for a pass to switch play.\n\n**In Defense:** Break up opposition attacks before they reach the back four. Mark the opposing attacking midfielder.\n\n**Key to Success:** Positional discipline and clean tackling.' },
            { id: 'RCM', name: 'Right Center Mid', top: '50%', left: '70%', role: '**Core Responsibility:** A dynamic link between defense and attack (a "number 8").\n\n**In Attack:** Make forward runs into the right half-space, support the right winger, and arrive late in the box to score.\n\n**In Defense:** Press aggressively to win the ball back high up the pitch.\n\n**Key to Success:** High energy, good dribbling, and an eye for goal.' },
            { id: 'LCM', name: 'Left Center Mid', top: '50%', left: '30%', role: '**Core Responsibility:** The primary playmaker and creative force.\n\n**In Attack:** Find pockets of space between the lines to receive the ball and play killer passes to the front three.\n\n**In Defense:** Help maintain a compact midfield shape and force play wide.\n\n**Key to Success:** Exceptional vision and passing range.' },
            { id: 'RW', name: 'Right Winger', top: '20%', left: '88%', role: '**Core Responsibility:** Be the main attacking threat on the right flank.\n\n**In Attack:** Isolate the opposing full-back and beat them 1v1. Cut inside to shoot or go outside to cross.\n\n**In Defense:** Press the opposing full-back to stop them from starting attacks.\n\n**Key to Success:** Explosive pace and clinical finishing or crossing.' },
            { id: 'LW', name: 'Left Winger', top: '20%', left: '12%', role: '**Core Responsibility:** Be the main attacking threat on the left flank.\n\n**In Attack:** Often an "inverted winger" who cuts inside onto their stronger right foot to shoot.\n\n**In Defense:** Track the opposing full-back to provide defensive cover.\n\n**Key to Success:** Dribbling ability and a powerful shot.' },
            { id: 'ST', name: 'Striker', top: '15%', left: '50%', role: '**Core Responsibility:** Lead the line and score goals.\n\n**In Attack:** Be the focal point. Make runs behind the defense, link up with the wingers, and finish chances in the box.\n\n**In Defense:** Press the center backs and goalkeeper, forcing them into mistakes.\n\n**Key to Success:** Intelligent movement and being clinical in front of goal.' },
        ]
    },
     "3-5-2": {
        name: "3-5-2",
        description: "A formation that packs the midfield, aiming to control possession and use wing-backs for width.",
        players: [
            { id: 'GK', name: 'Goalkeeper', top: '92%', left: '50%', role: '**Core Responsibility:** Act as a sweeper-keeper behind the back three.\n\n**In Attack:** Distribute to the wing-backs to start attacks quickly.\n\n**In Defense:** Be aggressive in coming off your line to deal with balls played over the top of the defense.\n\n**Key to Success:** Proactive starting position and communication.' },
            { id: 'RCB', name: 'Right Center Back', top: '82%', left: '75%', role: '**Core Responsibility:** Defend the right side of the central defense.\n\n**In Attack:** Be comfortable stepping into midfield with the ball if space is available.\n\n**In Defense:** Must be able to defend in wide areas to cover for the attacking right wing-back.\n\n**Key to Success:** Versatility and being a strong 1v1 defender.' },
            { id: 'LCB', name: 'Left Center Back', top: '82%', left: '25%', role: '**Core Responsibility:** Defend the left side of the central defense.\n\n**In Attack:** Provide good passing angles to build from the back.\n\n**In Defense:** Cover the space behind the left wing-back and be aggressive in the tackle.\n\n**Key to Success:** Good on-ball skills for a defender.' },
            { id: 'CB', name: 'Center Back', top: '85%', left: '50%', role: '**Core Responsibility:** Organize the back three and act as the last line of defense.\n\n**In Attack:** Rarely ventures forward; provides defensive security.\n\n**In Defense:** Sweep up any balls that get past the other two center backs. Dominate aerial duels.\n\n**Key to Success:** Leadership and being a master of positioning.' },
            { id: 'RWB', name: 'Right Wing-Back', top: '50%', left: '90%', role: '**Core Responsibility:** Control the entire right flank.\n\n**In Attack:** Act as a winger, providing crosses and attacking width.\n\n**In Defense:** Act as a full-back, tracking back to mark the opposing winger.\n\n**Key to Success:** Elite stamina and excellent crossing delivery.' },
            { id: 'LWB', name: 'Left Wing-Back', top: '50%', left: '10%', role: '**Core Responsibility:** Control the entire left flank.\n\n**In Attack:** Provide the team\'s primary width on the left, getting forward to support the strikers.\n\n**In Defense:** Recover quickly to form a back five and stop crosses.\n\n**Key to Success:** A huge engine and quality in the final third.' },
            { id: 'DM', name: 'Defensive Mid', top: '65%', left: '50%', role: '**Core Responsibility:** Protect the back three and link defense to midfield.\n\n**In Attack:** Recycle possession and switch play to the wing-backs.\n\n**In Defense:** Screen the defense, break up play, and make crucial interceptions.\n\n**Key to Success:** Tactical intelligence and tireless work rate.' },
            { id: 'RCM', name: 'Right Center Mid', top: '55%', left: '68%', role: '**Core Responsibility:** A box-to-box presence supporting the right side.\n\n**In Attack:** Combine with the right wing-back and right striker, making runs into the box.\n\n**In Defense:** Press high and support the defensive midfielder.\n\n**Key to Success:** Energy and intelligent off-the-ball runs.' },
            { id: 'LCM', name: 'Left Center Mid', top: '55%', left: '32%', role: '**Core Responsibility:** The creative hub of the midfield.\n\n**In Attack:** Thread passes through to the two strikers and create chances.\n\n**In Defense:** Hold a compact shape with the other central midfielders.\n\n**Key to Success:** Vision and the ability to unlock a defense with a pass.' },
            { id: 'RS', name: 'Right Striker', top: '18%', left: '60%', role: '**Core Responsibility:** Work with a partner to create and score goals.\n\n**In Attack:** One striker often drops deep to link play, while the other runs in behind. You must understand this rotation.\n\n**In Defense:** Cut off passing lanes to the opposition\'s defensive midfielders.\n\n**Key to Success:** A strong partnership and understanding with the other striker.' },
            { id: 'LS', name: 'Left Striker', top: '18%', left: '40%', role: '**Core Responsibility:** Be a constant goal threat and link with the midfield.\n\n**In Attack:** Occupy the opposition center backs, creating space for others. Be a clinical finisher.\n\n**In Defense:** Press from the front and force defenders into mistakes.\n\n**Key to Success:** Movement, finishing, and combination play.' },
        ]
    },
    "4-2-3-1": {
        name: "4-2-3-1",
        description: "A popular, flexible formation offering defensive solidity with a 'double pivot' and a potent, creative attack.",
        players: [
            { id: 'GK', name: 'Goalkeeper', top: '92%', left: '50%', role: '**Core Responsibility:** Standard goalkeeping duties.\n\n**In Attack:** Distribute to the full-backs or defensive midfielders to build play safely.\n\n**In Defense:** Organize the back four and be ready for shots from distance.\n\n**Key to Success:** Reliability and good communication.' },
            { id: 'RB', name: 'Right Back', top: '78%', left: '88%', role: '**Core Responsibility:** Defend the right flank and support the winger.\n\n**In Attack:** Provide overlapping runs to support the right attacking midfielder.\n\n**In Defense:** Mark the opposing left winger. The two defensive midfielders provide good cover.\n\n**Key to Success:** Stamina and making the right decision of when to attack vs. defend.' },
            { id: 'LB', name: 'Left Back', top: '78%', left: '12%', role: '**Core Responsibility:** Defend the left flank and support the winger.\n\n**In Attack:** Create width on the left side, allowing the left attacking midfielder to drift inside.\n\n**In Defense:** Maintain a solid back four line and communicate with the winger.\n\n**Key to Success:** Good 1v1 defending and consistent delivery from wide areas.' },
            { id: 'RCB', name: 'Right Center Back', top: '82%', left: '65%', role: '**Core Responsibility:** A no-nonsense defender focused on stopping the striker.\n\n**In Attack:** Keep it simple, pass to the defensive midfielders.\n\n**In Defense:** Be aggressive in duels, strong in the air, and organize the defensive line.\n\n**Key to Success:** Strength and defensive discipline.' },
            { id: 'LCB', name: 'Left Center Back', top: '82%', left: '35%', role: '**Core Responsibility:** Partner the other center back, often with better passing skills.\n\n**In Attack:** Can step out with the ball or play longer passes to break the lines.\n\n**In Defense:** Cover your partner and the left back, reading the game to intercept passes.\n\n**Key to Success:** Composure on the ball and tactical awareness.' },
            { id: 'RDM', name: 'Right Def. Mid', top: '65%', left: '62%', role: '**Core Responsibility:** One half of the "double pivot," providing a shield for the defense.\n\n**In Attack:** A box-to-box role, supporting attacks and recycling possession.\n\n**In Defense:** Break up play, tackle, and cover for the attacking full-back.\n\n**Key to Success:** High work rate and tactical discipline.' },
            { id: 'LDM', name: 'Left Def. Mid', top: '65%', left: '38%', role: '**Core Responsibility:** The second half of the "double pivot," often a deep-lying playmaker.\n\n**In Attack:** Dictate the tempo from deep, playing long diagonal passes and controlling the game.\n\n**In Defense:** Screen the back four and intercept passes.\n\n**Key to Success:** Excellent passing range and positional intelligence.' },
            { id: 'RAM', name: 'Right Att. Mid', top: '45%', left: '85%', role: '**Core Responsibility:** A wide creator and goal threat.\n\n**In Attack:** Take on defenders, cut inside to shoot, or deliver crosses for the striker.\n\n**In Defense:** Track back to help the right back and press the opposition full-back.\n\n**Key to Success:** Dribbling, speed, and end product (goals/assists).' },
            { id: 'LAM', name: 'Left Att. Mid', top: '45%', left: '15%', role: '**Core Responsibility:** A wide creator, often drifting inside.\n\n**In Attack:** Find pockets of space between the midfield and defense to link play.\n\n**In Defense:** Tuck in to make the midfield compact and force play wide.\n\n**Key to Success:** Creativity and intelligent movement.' },
            { id: 'CAM', name: 'Central Att. Mid', top: '38%', left: '50%', role: '**Core Responsibility:** The main creator of the team, the "number 10."\n\n**In Attack:** Operate in the space behind the striker, playing through-balls, shooting from distance, and linking all attacking play.\n\n**In Defense:** Mark the opposition\'s deepest midfielder to stop them building play.\n\n**Key to Success:** Vision, technical skill, and the ability to create something from nothing.' },
            { id: 'ST', name: 'Striker', top: '15%', left: '50%', role: '**Core Responsibility:** Be the focal point of the attack and the primary goalscorer.\n\n**In Attack:** Hold up the ball to bring the three attacking midfielders into play. Make runs to get on the end of chances.\n\n**In Defense:** Press the opposition center backs relentlessly.\n\n**Key to Success:** Clinical finishing and strength.' },
        ]
    },
    "5-3-2": {
        name: "5-3-2",
        description: "A highly defensive formation that aims to be compact and hard to break down, relying on counter-attacks.",
        players: [
            { id: 'GK', name: 'Goalkeeper', top: '92%', left: '50%', role: '**Core Responsibility:** Command a crowded penalty area.\n\n**In Attack:** Distribute quickly to the wing-backs to launch counter-attacks.\n\n**In Defense:** Be the final line of a very deep and compact defensive unit.\n\n**Key to Success:** Excellent handling and bravery.' },
            { id: 'RWB', name: 'Right Wing-Back', top: '60%', left: '90%', role: '**Core Responsibility:** Provide the team\'s entire width on the right flank.\n\n**In Attack:** Be the primary outlet on the counter-attack, running into the space ahead.\n\n**In Defense:** Recover to form a back five, marking the opposing winger.\n\n**Key to Success:** Exceptional pace and stamina.' },
            { id: 'LWB', name: 'Left Wing-Back', top: '60%', left: '10%', role: '**Core Responsibility:** Provide the team\'s entire width on the left flank.\n\n**In Attack:** Support counter-attacks and deliver crosses from deep.\n\n**In Defense:** Drop back to create a solid five-player defensive line.\n\n**Key to Success:** High fitness levels and defensive diligence.' },
            { id: 'RCB', name: 'Right Center Back', top: '82%', left: '75%', role: '**Core Responsibility:** Defend the right side of the box.\n\n**In Attack:** Keep passing simple and safe.\n\n**In Defense:** A pure defender. Mark your man, win your tackles, and clear any danger.\n\n**Key to Success:** Toughness and concentration.' },
            { id: 'LCB', name: 'Left Center Back', top: '82%', left: '25%', role: '**Core Responsibility:** Defend the left side of the box.\n\n**In Attack:** Safe passing is the priority.\n\n**In Defense:** Stay compact with the other center backs, leaving no space for attackers.\n\n**Key to Success:** Good positioning and communication.' },
            { id: 'CB', name: 'Center Back', top: '85%', left: '50%', role: '**Core Responsibility:** The central anchor of the back five, often a sweeper.\n\n**In Attack:** Stay back at all times.\n\n**In Defense:** Organize the defensive line, win crucial headers, and sweep up any balls that get through.\n\n**Key to Success:** Leadership and an excellent reader of the game.' },
            { id: 'RCM', name: 'Right Center Mid', top: '50%', left: '68%', role: '**Core Responsibility:** A hard-working midfielder who supports both defense and attack.\n\n**In Attack:** Join the counter-attack with late runs from midfield.\n\n**In Defense:** Stay compact and disciplined, preventing passes through the middle.\n\n**Key to Success:** High work rate and energy.' },
            { id: 'LCM', name: 'Left Center Mid', top: '50%', left: '32%', role: '**Core Responsibility:** A creative passer who can launch counter-attacks.\n\n**In Attack:** Look for long forward passes to the strikers as soon as the ball is won.\n\n**In Defense:** Help the midfield trio stay narrow and force the opposition wide.\n\n**Key to Success:** Vision and quick decision-making.' },
            { id: 'CM', name: 'Center Mid', top: '55%', left: '50%', role: '**Core Responsibility:** The most defensive of the three midfielders.\n\n**In Attack:** Link the defense to the other midfielders.\n\n**In Defense:** Screen the back five, breaking up play and protecting the central areas.\n\n**Key to Success:** Tenacious tackling and positional awareness.' },
            { id: 'RS', name: 'Right Striker', top: '20%', left: '60%', role: '**Core Responsibility:** Be an outlet for counter-attacks and a goal threat.\n\n**In Attack:** Use your pace to run in behind the opposition defense on the counter.\n\n**In Defense:** Drop back to help the midfield when needed, making the team very compact.\n\n**Key to Success:** Blistering speed and composure in front of goal.' },
            { id: 'LS', name: 'Left Striker', top: '20%', left: '40%', role: '**Core Responsibility:** Hold up the ball and link play on counter-attacks.\n\n**In Attack:** Be the target for long balls, holding off defenders and bringing your strike partner and midfielders into play.\n\n**In Defense:** Harass opposition defenders.\n\n**Key to Success:** Strength and good link-up play.' },
        ]
    }
};

const exerciseData = {
    "Jumping Jacks": { description: "A full-body exercise. Stand with your feet together and your hands at your sides. Simultaneously raise your arms above your head and jump up just enough to spread your feet out wide. Without pausing, quickly reverse the movement and repeat.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Jumping+Jacks" },
    "High Knees": { description: "A cardiovascular exercise. Stand in place with your feet hip-width apart. Drive your right knee toward your chest and quickly place it back on the ground. Follow immediately by driving your left knee toward your chest. Continue to alternate knees.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=High+Knees" },
    "Squats": { description: "A lower-body strength exercise. Stand with your feet shoulder-width apart. Lower your hips as if you're sitting in a chair, keeping your chest up and your back straight. Go as low as you can comfortably, then push through your heels to return to the starting position.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Squats" },
    "Lunges": { description: "Targets the quadriceps, glutes, and hamstrings. Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. Ensure your front knee is directly above your ankle and your other knee is hovering off the ground. Push off your front foot to return to the start.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Lunges" },
    "Plank": { description: "A core stability exercise. Lie on your stomach and prop yourself up on your forearms and toes, keeping your body in a straight line from your head to your heels. Engage your core and glutes. Hold this position without letting your hips sag.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Plank" },
    "Push-ups": { description: "A classic upper-body exercise. Start in a high plank position with your hands slightly wider than your shoulders. Lower your body until your chest nearly touches the floor. Keep your body in a straight line. Push yourself back up to the starting position.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Push-ups" },
    "Glute Bridges": { description: "Strengthens the glutes and hamstrings. Lie on your back with your knees bent and feet flat on the floor, hip-width apart. Drive through your heels to lift your hips off the ground until your body forms a straight line from your shoulders to your knees. Squeeze your glutes at the top.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Glute+Bridges" },
    "Leg Swings": { description: "A dynamic stretch for the hips and hamstrings. Stand tall and hold onto a wall or sturdy object for balance. Swing one leg forward and backward in a controlled motion. Then, swing it side to side in front of your body.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Leg+Swings" },
    "Quad Stretch": { description: "A static stretch. Stand on one leg, holding onto something for support if needed. Grab your other foot and gently pull it towards your glute, feeling a stretch in the front of your thigh. Hold for 20-30 seconds.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Quad+Stretch" },
    "Hamstring Stretch": { description: "A static stretch. Sit on the floor with one leg extended straight out. Bend your other leg and place the sole of your foot against your inner thigh. Gently lean forward over the straight leg until you feel a stretch. Hold for 20-30 seconds.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Hamstring+Stretch" },
    "Box Jumps": { description: "An explosive plyometric exercise. Stand in front of a sturdy box or platform. Lower into a partial squat and jump explosively up onto the box, landing softly with your knees bent. Step back down, don't jump.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Box+Jumps" },
    "Russian Twists": { description: "A core exercise for the obliques. Sit on the floor with your knees bent and feet off the ground. Lean back slightly, keeping your back straight. Clasp your hands together and twist your torso from side to side.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Russian+Twists" },
    "Burpees": { description: "A full-body conditioning exercise. From a standing position, drop into a squat, place your hands on the ground, kick your feet back into a plank, do a push-up, return your feet to the squat position, and jump up explosively.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Burpees" },
    "A-Skips": { description: "A dynamic drill for coordination and power. It's an exaggerated skipping motion. Drive one knee up high while the opposite arm drives forward. Hop off the ground with your plant leg. Focus on being light and quick.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=A-Skips" },
    "Single Leg RDLs": { description: "A balance and hamstring exercise. Stand on one leg with a slight bend in the knee. Hinge at your hips, extending your other leg straight behind you for balance. Lower your torso until it's parallel to the ground, then return to the starting position.", imageUrl: "https://placehold.co/400x300/2d3748/9ca3af?text=Single+Leg+RDL" },
};


// --- HELPER & UI COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg text-white relative" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700 flex justify-between items-center"><h3 className="text-2xl font-bold text-green-400">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-white transition"><Icon name="X" size={28} /></button></div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

const DrillOverlay = ({ drill, onComplete, onClose }) => {
    const [timeLeft, setTimeLeft] = useState(drill.duration || 120);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isTimerRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isTimerRunning, timeLeft]);

    const formatTime = (s) => `${Math.floor(s/60)}:${(s%60)<10?'0':''}${s%60}`;

    return (
        <div className="fixed inset-0 bg-gray-900 z-40 p-4 sm:p-8 flex flex-col text-white">
            <div className="flex-shrink-0 flex justify-between items-center mb-6"><h2 className="text-3xl sm:text-4xl font-bold text-green-400">{drill.name}</h2><button onClick={onClose} className="text-gray-400 hover:text-white transition"><Icon name="X" size={32} /></button></div>
            <div className="flex-grow overflow-y-auto mb-6"><h3 className="text-xl font-semibold mb-2 text-yellow-400">How to do it:</h3><p className="text-gray-300 whitespace-pre-line leading-relaxed">{drill.description}</p></div>
            <div className="flex-shrink-0 text-center"><div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>{!isTimerRunning && (<button onClick={() => setIsTimerRunning(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105">Start Timer</button>)} {isTimerRunning && (<button onClick={onComplete} disabled={timeLeft > 0} className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed enabled:hover:bg-blue-600">{timeLeft > 0 ? `Complete in ${formatTime(timeLeft)}` : 'Complete Drill'}</button>)}</div>
        </div>
    );
};

// --- MAIN APP COMPONENTS ---

const PositionSelection = ({ setUserData }) => {
    const positions = [
        { name: 'Forward', icon: <Icon name="Target" className="w-12 h-12" /> },
        { name: 'Midfielder', icon: <Icon name="Dribbble" className="w-12 h-12" /> },
        { name: 'Defender', icon: <Icon name="Shield" className="w-12 h-12" /> },
        { name: 'Goalkeeper', icon: <Icon name="Zap" className="w-12 h-12" /> },
    ];
    const handleSelect = (position) => {
        setUserData({
            position: position,
            streak: 0,
            xp: 0,
            lastCompletedDate: null,
            completedLessons: [],
            unlockedAchievements: [],
            matchLogs: [],
        });
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <h2 className="text-4xl font-bold text-green-400 mb-2">Welcome to Soccer Pro</h2>
            <p className="text-xl text-gray-400 mb-12">Choose your position to start training.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{positions.map(pos => (<div key={pos.name} onClick={() => handleSelect(pos.name)} className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 hover:bg-green-500 transition duration-300"><div className="text-green-400 mb-4">{pos.icon}</div><h3 className="text-2xl font-bold">{pos.name}</h3></div>))}</div>
        </div>
    );
};

const Dashboard = ({ userData, setUserData }) => {
    const [activeTab, setActiveTab] = useState('lessons');
    const [modalContent, setModalContent] = useState(null);
    const [variation, setVariation] = useState({ drillName: '', text: '', isLoading: false });
    const [isNavVisible, setIsNavVisible] = useState(true);

    const openModal = (item, type) => {
        setVariation({ drillName: '', text: '', isLoading: false });
        const title = item.name || item.title;
        let content;

        if (type === 'skill') {
            content = (
                <div>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg w-full flex items-center justify-center transition">
                        <Icon name="Youtube" className="mr-2" /> Watch on YouTube
                    </a>
                </div>
            );
        } else if (type === 'visualization') {
            content = (
                <div>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed italic">{item.script}</p>
                    </div>
                </div>
            );
        } else if (type === 'exercise') {
             content = (
                <div>
                    <img src={item.imageUrl} alt={item.name} className="w-full h-auto rounded-lg mb-4" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/2d3748/9ca3af?text=Image+Not+Found'; }} />
                    <p className="text-gray-300">{item.description}</p>
                </div>
            );
        } else { // drill
            content = (
                 <div>
                    <p className="text-gray-300">{item.description}</p>
                    <button 
                        onClick={() => handleSuggestVariation(item)} 
                        disabled={variation.isLoading}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center transition disabled:bg-gray-500"
                    >
                        <Icon name="Sparkles" className="mr-2 h-4 w-4" /> {variation.isLoading ? 'Thinking...' : 'Suggest Variation'}
                    </button>
                    {variation.text && variation.drillName === item.name && (
                        <div className="mt-4 bg-gray-900 p-4 rounded-lg">
                             <h4 className="font-bold text-purple-400 mb-2">AI Variation:</h4>
                             <p className="text-gray-300 whitespace-pre-line">{variation.text}</p>
                        </div>
                    )}
                </div>
            );
        }
        setModalContent({ title, content });
    };

    const handleSuggestVariation = async (drill) => {
        setVariation({ drillName: drill.name, text: '', isLoading: true });
        const prompt = `You are a creative soccer coach. Given the following drill, suggest a fun and effective variation that a player can do alone. Make it challenging but achievable.
        
        Drill Name: "${drill.name}"
        Drill Description: "${drill.description}"
        
        Provide only the description of the new variation.`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const variationText = result.candidates[0].content.parts[0].text;
            setVariation({ drillName: drill.name, text: variationText, isLoading: false });
        } catch (error) {
            console.error("Error fetching drill variation:", error);
            setVariation({ drillName: drill.name, text: "Sorry, I couldn't think of a variation right now. Please try again.", isLoading: false });
        }
    };

    useEffect(() => {
        if (modalContent && variation.drillName === modalContent.title) {
            openModal(modalContent.item, modalContent.type);
        }
    }, [variation]);


    const closeModal = () => setModalContent(null);
    const handleReset = () => setUserData(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'lessons': return <LessonsTab userData={userData} setUserData={setUserData} />;
            case 'training': return <TrainingHubTab userData={userData} onDrillSelect={(drill) => openModal(drill, 'drill')} onMindsetSelect={(vis) => openModal(vis, 'visualization')} onSkillSelect={(skill) => openModal(skill, 'skill')} />;
            case 'performance': return <PerformanceHubTab userData={userData} onDrillSelect={(drill) => openModal(drill, 'drill')} onSkillSelect={(skill) => openModal(skill, 'skill')} onExerciseSelect={(exercise) => openModal(exercise, 'exercise')} />;
            case 'profile': return <ProfileTab userData={userData} setUserData={setUserData} />;
            default: return <LessonsTab userData={userData} setUserData={setUserData} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="bg-gray-800 p-4 flex justify-between items-center shadow-lg flex-shrink-0">
                <div><h1 className="text-2xl font-bold text-green-400">Soccer Pro</h1><p className="text-gray-400">{userData.position}</p></div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full"><Icon name="Star" className="w-5 h-5 text-yellow-400 mr-2" /> <span className="text-lg font-bold">{userData.xp} XP</span></div>
                    <div className="flex items-center"><span className="text-yellow-400 text-2xl">🔥</span><span className="text-xl font-bold">{userData.streak}</span></div>
                    <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">Reset</button>
                </div>
            </header>
            
            <main className={`flex-grow p-4 md:p-8 transition-all duration-300 ${isNavVisible ? 'pb-24' : 'pb-12'}`}>{renderContent()}</main>

            <button 
                onClick={() => setIsNavVisible(!isNavVisible)}
                className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-20 transition-transform duration-300 hover:scale-110"
            >
                {isNavVisible ? <Icon name="ChevronDown" /> : <Icon name="ChevronUp" />}
            </button>

            <nav className={`fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg transition-transform duration-300 ease-in-out z-10 ${isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex items-center justify-around h-16 max-w-7xl mx-auto px-2">
                    <button onClick={() => setActiveTab('lessons')} className={`flex flex-col items-center justify-center transition w-16 ${activeTab === 'lessons' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}><Icon name="Trophy" /> <span className="text-xs mt-1">Lessons</span></button>
                    <button onClick={() => setActiveTab('training')} className={`flex flex-col items-center justify-center transition w-16 ${activeTab === 'training' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}><Icon name="Target" /> <span className="text-xs mt-1">Training</span></button>
                    <button onClick={() => setActiveTab('performance')} className={`flex flex-col items-center justify-center transition w-16 ${activeTab === 'performance' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}><Icon name="HeartPulse" /> <span className="text-xs mt-1">Performance</span></button>
                    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center transition w-16 ${activeTab === 'profile' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}><Icon name="User" /> <span className="text-xs mt-1">Profile</span></button>
                </div>
            </nav>

            <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent?.title}>{modalContent?.content}</Modal>
        </div>
    );
};

const LessonsTab = ({ userData, setUserData }) => {
    const [activeDrill, setActiveDrill] = useState(null);
    const drillsForPath = drillsByPosition[userData.position] || [];

    const handleCompleteDrill = () => {
        const newCompleted = [...userData.completedLessons, activeDrill.name];
        const newXp = userData.xp + 10;
        let newStreak = userData.streak;
        const today = new Date().toDateString();
        const lastDate = userData.lastCompletedDate ? new Date(userData.lastCompletedDate).toDateString() : null;

        if (today !== lastDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            newStreak = lastDate === yesterday.toDateString() ? newStreak + 1 : 1;
        }

        const newUnlockedAchievements = [...userData.unlockedAchievements];
        achievementsData.forEach(ach => {
            if (!newUnlockedAchievements.includes(ach.id)) {
                if ((ach.criteria.type === 'drills' && newCompleted.length >= ach.criteria.value) ||
                    (ach.criteria.type === 'streak' && newStreak >= ach.criteria.value) ||
                    (ach.criteria.type === 'xp' && newXp >= ach.criteria.value)) {
                    newUnlockedAchievements.push(ach.id);
                }
            }
        });
        
        setUserData({ ...userData, completedLessons: newCompleted, xp: newXp, streak: newStreak, lastCompletedDate: new Date().toISOString(), unlockedAchievements: newUnlockedAchievements });
        setActiveDrill(null);
    };

    const completedCount = userData.completedLessons.length;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-green-400 text-center">{userData.position} Path</h2>
            <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 border-l-4 border-gray-700 border-dashed"></div>
                {drillsForPath.map((drill, index) => {
                    const isCompleted = userData.completedLessons.includes(drill.name);
                    const isCurrent = completedCount === index;
                    const isLocked = completedCount < index;
                    const alignment = index % 2 === 0 ? 'mr-auto' : 'ml-auto';
                    
                    if (drill.isMilestone) {
                        return (<div key={index} className={`relative my-8 w-[calc(50%-2.5rem)] ${alignment}`}>
                            <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'right-[-3rem]' : 'left-[-3rem]'} w-10 h-10 rounded-full ${isCompleted ? 'bg-yellow-400' : 'bg-gray-700'} border-4 border-gray-900 flex items-center justify-center`}><Icon name="Trophy" size={20} className="text-white" /></div>
                            <div className={`p-4 rounded-lg ${isCompleted ? 'bg-gray-800' : 'bg-gray-900 opacity-60'}`}><h3 className={`text-md font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>{drill.name}</h3></div>
                        </div>);
                    }

                    let statusColor = 'bg-gray-700';
                    let nodeIcon = <Icon name="Lock" size={20} className="text-gray-400" />;
                    if (isCompleted) {
                        statusColor = 'bg-green-500';
                        nodeIcon = <Icon name="CheckCircle" size={20} className="text-white" />;
                    } else if (isCurrent) {
                        statusColor = 'bg-yellow-500 animate-pulse';
                        nodeIcon = <Icon name="Star" size={20} className="text-white" />;
                    }

                    return (
                        <div key={drill.name} className={`relative my-8 w-[calc(50%-2.5rem)] ${alignment}`}>
                            <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'right-[-3rem]' : 'left-[-3rem]'} w-10 h-10 rounded-full ${statusColor} border-4 border-gray-900 flex items-center justify-center`}>{nodeIcon}</div>
                            <div className={`p-4 rounded-lg transition-all duration-300 ${isLocked ? 'bg-gray-900 opacity-60' : 'bg-gray-800'}`}>
                                <h3 className={`text-md font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>{drill.name}</h3>
                                {isCurrent && (<button onClick={() => setActiveDrill(drill)} className="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg w-full text-sm flex items-center justify-center"><Icon name="PlayCircle" size={16} className="mr-2" /> Start</button>)}
                            </div>
                        </div>
                    );
                })}
            </div>
            {activeDrill && (<DrillOverlay drill={activeDrill} onComplete={handleCompleteDrill} onClose={() => setActiveDrill(null)} />)}
        </div>
    );
};

const LibraryTab = ({ title, data, onSelect, type }) => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(data.map(item => item.category))].filter(Boolean);
    const filteredData = filter === 'All' ? data : data.filter(item => item.category === filter);

    return (
        <div>
            <div className="mb-6 flex flex-wrap gap-2">{categories.map(category => (<button key={category} onClick={() => setFilter(category)} className={`py-2 px-4 rounded-full text-sm font-semibold transition ${filter === category ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{category}</button>))}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filteredData.map(item => (<button key={item.name} onClick={() => onSelect(item)} className="bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-700 transition h-full flex flex-col"><h4 className="text-lg font-bold text-white flex-grow">{item.name}</h4><p className="text-gray-400 text-sm mt-1">{item.description}</p></button>))}</div>
        </div>
    );
};

const ProfileTab = ({ userData, setUserData }) => {
    const [showLogForm, setShowLogForm] = useState(false);
    const [logData, setLogData] = useState({ minutes: '', goals: '', assists: '', good: '', improve: '' });

    const handleLogSubmit = (e) => {
        e.preventDefault();
        const newLog = { ...logData, date: new Date().toLocaleDateString() };
        const newUserData = { ...userData, matchLogs: [...(userData.matchLogs || []), newLog] };
        setUserData(newUserData);
        setLogData({ minutes: '', goals: '', assists: '', good: '', improve: '' });
        setShowLogForm(false);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
                <div className="bg-gray-800 p-4 rounded-lg"><p className="text-sm text-gray-400">Total XP</p><p className="text-3xl font-bold">{userData.xp}</p></div>
                <div className="bg-gray-800 p-4 rounded-lg"><p className="text-sm text-gray-400">Current Streak</p><p className="text-3xl font-bold">{userData.streak} Days</p></div>
                <div className="bg-gray-800 p-4 rounded-lg"><p className="text-sm text-gray-400">Lessons Done</p><p className="text-3xl font-bold">{userData.completedLessons.length}</p></div>
            </div>
            
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-green-400">Match Logs</h3>
                    <button onClick={() => setShowLogForm(!showLogForm)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">{showLogForm ? 'Cancel' : 'Add Log'}</button>
                </div>

                {showLogForm && (
                       <form onSubmit={handleLogSubmit} className="bg-gray-800 p-4 rounded-lg mb-4 space-y-3">
                           <div className="grid grid-cols-3 gap-3">
                               <input type="number" placeholder="Mins" value={logData.minutes} onChange={e => setLogData({...logData, minutes: e.target.value})} className="bg-gray-700 p-2 rounded-lg" />
                               <input type="number" placeholder="Goals" value={logData.goals} onChange={e => setLogData({...logData, goals: e.target.value})} className="bg-gray-700 p-2 rounded-lg" />
                               <input type="number" placeholder="Assists" value={logData.assists} onChange={e => setLogData({...logData, assists: e.target.value})} className="bg-gray-700 p-2 rounded-lg" />
                           </div>
                           <textarea placeholder="What went well?" value={logData.good} onChange={e => setLogData({...logData, good: e.target.value})} className="w-full bg-gray-700 p-2 rounded-lg h-20"></textarea>
                           <textarea placeholder="What to improve on?" value={logData.improve} onChange={e => setLogData({...logData, improve: e.target.value})} className="w-full bg-gray-700 p-2 rounded-lg h-20"></textarea>
                           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">Save Log</button>
                       </form>
                )}

                <div className="space-y-3">
                    {(userData.matchLogs || []).map((log, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <p className="font-bold text-white">Match on {log.date} - <span className="font-normal">{log.minutes}'</span></p>
                            <p className="text-sm text-gray-300">Goals: {log.goals}, Assists: {log.assists}</p>
                            <p className="text-sm mt-2"><strong className="text-green-400">Good:</strong> {log.good}</p>
                            <p className="text-sm mt-1"><strong className="text-yellow-400">Improve:</strong> {log.improve}</p>
                        </div>
                    )).reverse()}
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-green-400">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.map(ach => {
                    const isUnlocked = userData.unlockedAchievements.includes(ach.id);
                    return (<div key={ach.id} className={`bg-gray-800 p-4 rounded-lg flex items-center transition ${isUnlocked ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${isUnlocked ? 'bg-yellow-500' : 'bg-gray-700'}`}><Icon name="Trophy" className="text-white" /></div>
                        <div><h4 className="font-bold text-white">{ach.name}</h4><p className="text-sm text-gray-400">{ach.description}</p></div>
                    </div>);
                })}
            </div>
        </div>
    );
};

const AiCoachTab = ({ onDrillSelect, onSkillSelect }) => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);
    
    const parseResponse = (text) => {
        const parts = [];
        const regex = /\[(Drill|Skill): (.*?)\]/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
            }
            parts.push({ type: match[1].toLowerCase(), content: match[2] });
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.slice(lastIndex) });
        }
        return parts;
    };

    const handleSearch = async () => {
        if (!query.trim() || isLoading) return;

        const newUserMessage = { role: 'user', parts: [{ type: 'text', content: query }] };
        setChatHistory(prev => [...prev, newUserMessage]);
        setQuery('');
        setIsLoading(true);

        const prompt = `You are an expert, encouraging soccer coach AI. A user wants advice. Your goal is to provide a helpful, conversational, and **concise** response. **Keep your main text response to 1-2 sentences.**

        Here is the user's request: "${query}"

        You have access to a library of drills and skills. If it is helpful to your answer, you can reference them. To reference a drill, use the format [Drill: Drill Name]. To reference a skill, use the format [Skill: Skill Name]. Do not recommend more than 3 drills/skills in a single response. Only recommend items from the lists provided below.

        Here is the list of available drills:
        ${JSON.stringify(allDrills.map(d => d.name))}

        Here is the list of available skills:
        ${JSON.stringify(skillsData.map(s => s.name))}

        Provide a direct, helpful response to the user. Do not respond in JSON.`;

        try {
            let apiChatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: apiChatHistory };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            const parsedParts = parseResponse(responseText);
            
            setChatHistory(prev => [...prev, { role: 'coach', parts: parsedParts }]);

        } catch (error) {
            console.error("Error with AI Coach:", error);
            setChatHistory(prev => [...prev, { role: 'coach', parts: [{ type: 'text', content: "Sorry, I had trouble thinking of a response. Please try asking in a different way." }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-green-400 text-center">AI Coach</h2>
            <div ref={chatContainerRef} className="flex-grow bg-gray-800 rounded-lg p-4 space-y-4 overflow-y-auto mb-4 min-h-[50vh]">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'coach' && <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>}
                        <div className={`p-3 rounded-lg max-w-sm ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                            {message.parts.map((part, i) => {
                                if (part.type === 'text') {
                                    return <span key={i}>{part.content}</span>;
                                }
                                if (part.type === 'drill') {
                                    const drill = allDrills.find(d => d.name === part.content);
                                    if (!drill) return <span key={i}>[Drill: {part.content}]</span>;
                                    return <button key={i} onClick={() => onDrillSelect(drill)} className="bg-gray-600 hover:bg-gray-500 p-2 my-1 rounded-lg w-full text-left font-bold block">{part.content}</button>;
                                }
                                if (part.type === 'skill') {
                                    const skill = skillsData.find(s => s.name === part.content);
                                    if (!skill) return <span key={i}>[Skill: {part.content}]</span>;
                                    return <button key={i} onClick={() => onSkillSelect(skill)} className="bg-purple-600 hover:bg-purple-500 p-2 my-1 rounded-lg w-full text-left font-bold block">{part.content}</button>;
                                }
                                return null;
                            })}
                        </div>
                         {message.role === 'user' && <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="User" className="text-white" /></div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>
                         <div className="p-3 rounded-lg max-w-sm bg-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            </div>
                         </div>
                     </div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Ask for training advice..."
                    className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button onClick={handleSearch} disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg disabled:bg-gray-500">
                    <Icon name="Send" />
                </button>
            </div>
        </div>
    );
};

const MindsetTab = ({ userData, onMindsetSelect }) => {
    const exercises = visualizationData[userData.position] || [];
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-green-400">Mental Training</h2>
            <p className="text-gray-400 mb-6">Read the prompt, find a quiet space, close your eyes, and visualize yourself performing these actions perfectly. Mental rehearsal is a key part of elite performance.</p>
            <div className="space-y-4">
                {exercises.map(exercise => (
                    <button key={exercise.title} onClick={() => onMindsetSelect(exercise)} className="bg-gray-800 p-4 rounded-lg w-full text-left hover:bg-gray-700 transition">
                        <h4 className="font-bold text-white text-lg">{exercise.title}</h4>
                        <p className="text-sm text-gray-400">{exercise.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const TrainingHubTab = ({ userData, onDrillSelect, onMindsetSelect, onSkillSelect }) => {
    const [activeSection, setActiveSection] = useState('drills');

    return (
        <div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-800 p-1 rounded-lg flex gap-1">
                    <button onClick={() => setActiveSection('drills')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'drills' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Drills</button>
                    <button onClick={() => setActiveSection('skills')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'skills' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Skills</button>
                    <button onClick={() => setActiveSection('mental')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'mental' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Mental</button>
                    <button onClick={() => setActiveSection('coach')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'coach' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>AI Coach</button>
                </div>
            </div>
            {activeSection === 'drills' && <LibraryTab title="Physical Drills" data={allDrills} onSelect={onDrillSelect} type="drill" />}
            {activeSection === 'skills' && <LibraryTab title="Skills Library" data={skillsData} onSelect={onSkillSelect} type="skill" />}
            {activeSection === 'mental' && <MindsetTab userData={userData} onMindsetSelect={onMindsetSelect} />}
            {activeSection === 'coach' && <AiCoachTab onDrillSelect={onDrillSelect} onSkillSelect={onSkillSelect} />}
        </div>
    );
};

const NutritionCoachTab = ({ userData }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [mealPlan, setMealPlan] = useState(null);
    const [mealPlanSummary, setMealPlanSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [chatQuery, setChatQuery] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const questions = [
        { key: 'gameDay', text: 'Is your game tomorrow or today?', options: ['Tomorrow', 'Today'] },
        { key: 'travel', text: 'Have you traveled recently (e.g., a long flight)?', options: ['Yes', 'No'] },
        { key: 'restrictions', text: 'Any dietary restrictions?', type: 'text', placeholder: 'e.g., vegetarian, none' },
        { key: 'gameTime', text: 'What time is your game?', type: 'text', placeholder: 'e.g., 3:00 PM' },
    ];
    
    const handleAnswer = (key, value) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            generatePlan(newAnswers);
        }
    };

    const handleOptionClick = (value) => {
        handleAnswer(questions[step].key, value);
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        handleAnswer(questions[step].key, textInputValue);
        setTextInputValue('');
    };

    const generatePlan = async (finalAnswers) => {
        setIsLoading(true);
        const prompt = `You are an expert sports nutritionist for elite soccer players. A player needs a meal plan. Provide a detailed plan in a JSON format. The JSON object should have three keys: "summary" (a 1-3 sentence overview of the nutritional strategy), "day_before", and "game_day". Each of the day keys should be an array of meal objects. Each meal object must have "meal_name" (e.g., "Breakfast"), "time_suggestion", and "food_items" (an array of strings).

        Here is the player's situation:
        - Game Day: ${finalAnswers.gameDay}
        - Game Time: ${finalAnswers.gameTime}
        - Recent Travel: ${finalAnswers.travel}
        - Dietary Restrictions: ${finalAnswers.restrictions || 'None'}

        Based on this, create the ideal meal plan. If they have traveled, incorporate foods rich in electrolytes like bananas or coconut water. Time the meals appropriately around the game. Ensure the plan is healthy, performance-focused, and respects the dietary restrictions.`;
        
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { 
                contents: chatHistory,
                generationConfig: { responseMimeType: "application/json" }
            };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            const parsedPlan = JSON.parse(responseText);
            setMealPlan(parsedPlan);
            setMealPlanSummary(parsedPlan.summary);
            setChatHistory([{role: 'coach', text: "Here's your personalized meal plan. Let me know if you have any questions or need any changes!"}]);

        } catch (error) {
            console.error("Error generating meal plan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChatSubmit = async () => {
        if (!chatQuery.trim() || isChatLoading) return;

        const newUserMessage = { role: 'user', text: chatQuery };
        setChatHistory(prev => [...prev, newUserMessage]);
        setChatQuery('');
        setIsChatLoading(true);

        const prompt = `You are an expert sports nutritionist AI. You have already provided the following meal plan to a user: ${JSON.stringify(mealPlan)}.
        
        The user now has a follow-up question or a change request: "${chatQuery}"
        
        Your task is to respond. 
        - If the user asks for a change (e.g., "replace chicken with fish", "add more carbs"), generate a NEW, COMPLETE meal plan in the same JSON format as the original, incorporating their request. Your entire response should be ONLY the JSON object.
        - If the user is just asking a question (e.g., "why is this healthy?"), provide a conversational text answer. Your entire response should be ONLY the text answer.`;

        try {
            let apiChatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: apiChatHistory };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            
            try {
                const potentialPlan = JSON.parse(responseText);
                if (potentialPlan.day_before && potentialPlan.game_day) {
                    setMealPlan(potentialPlan);
                    setMealPlanSummary(potentialPlan.summary || "Here is your updated plan.");
                    setChatHistory(prev => [...prev, { role: 'coach', text: "Of course, I've updated your meal plan based on your request." }]);
                } else {
                    setChatHistory(prev => [...prev, { role: 'coach', text: responseText }]);
                }
            } catch (e) {
                setChatHistory(prev => [...prev, { role: 'coach', text: responseText }]);
            }

        } catch (error) {
            console.error("Error with Nutrition chat:", error);
            setChatHistory(prev => [...prev, { role: 'coach', text: "Sorry, I'm having trouble responding right now. Please try again." }]);
        } finally {
            setIsChatLoading(false);
        }
    };
    
    const startOver = () => {
        setStep(0);
        setAnswers({});
        setMealPlan(null);
        setMealPlanSummary('');
        setTextInputValue('');
        setChatHistory([]);
    }

    const currentQuestion = questions[step];

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-green-400">AI Nutritionist</h2>
            {!mealPlan && !isLoading && (
                 <div className="bg-gray-800 p-6 rounded-lg">
                    <p className="text-lg text-gray-300 mb-6">{currentQuestion.text}</p>
                    {currentQuestion.options ? (
                        <div className="flex gap-4">
                            {currentQuestion.options.map(opt => (
                                <button key={opt} onClick={() => handleOptionClick(opt)} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">{opt}</button>
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={handleTextSubmit}>
                            <input 
                                type="text" 
                                value={textInputValue}
                                onChange={(e) => setTextInputValue(e.target.value)}
                                placeholder={currentQuestion.placeholder} 
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 mb-4" 
                                required 
                            />
                            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">
                                {step === questions.length - 1 ? 'Generate Plan' : 'Next'}
                            </button>
                        </form>
                    )}
                </div>
            )}
            {isLoading && <p className="text-center">Generating your personalized plan...</p>}
            {mealPlan && (
                <div>
                     <div className="bg-blue-900/50 p-4 rounded-lg mb-6 border border-blue-700">
                        <p className="text-blue-200 italic">{mealPlanSummary}</p>
                    </div>
                     <div className="mb-6">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-3">Day Before Game</h3>
                        <div className="space-y-3">
                            {mealPlan.day_before.map(meal => (
                                <div key={meal.meal_name} className="bg-gray-800 p-4 rounded-lg">
                                    <p className="font-bold text-white">{meal.meal_name} <span className="text-sm text-gray-400 font-normal">{meal.time_suggestion}</span></p>
                                    <ul className="list-disc list-inside text-gray-300 mt-1">
                                        {meal.food_items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-yellow-400 mb-3">Game Day</h3>
                         <div className="space-y-3">
                            {mealPlan.game_day.map(meal => (
                                <div key={meal.meal_name} className="bg-gray-800 p-4 rounded-lg">
                                    <p className="font-bold text-white">{meal.meal_name} <span className="text-sm text-gray-400 font-normal">{meal.time_suggestion}</span></p>
                                    <ul className="list-disc list-inside text-gray-300 mt-1">
                                        {meal.food_items.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">Chat with your Nutritionist</h3>
                        <div ref={chatContainerRef} className="flex-grow bg-gray-800 rounded-lg p-4 space-y-4 overflow-y-auto mb-4 min-h-[30vh]">
                             {chatHistory.map((message, index) => (
                                 <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                     {message.role === 'coach' && <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>}
                                     <div className={`p-3 rounded-lg max-w-sm ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                         <p>{message.text}</p>
                                     </div>
                                     {message.role === 'user' && <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="User" className="text-white" /></div>}
                                 </div>
                             ))}
                             {isChatLoading && (
                                 <div className="flex items-start gap-3">
                                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>
                                     <div className="p-3 rounded-lg max-w-sm bg-gray-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                        </div>
                                     </div>
                                 </div>
                             )}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={chatQuery}
                                onChange={(e) => setChatQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                                placeholder="Ask about your meal plan..."
                                className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button onClick={handleChatSubmit} disabled={isChatLoading} className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg disabled:bg-gray-500">
                                <Icon name="Send" />
                            </button>
                        </div>
                    </div>

                    <button onClick={startOver} className="mt-6 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition">Start Over</button>
                </div>
            )}
        </div>
    );
};

const PerformanceHubTab = ({ userData, onDrillSelect, onSkillSelect, onExerciseSelect }) => {
    const [activeSection, setActiveSection] = useState('strength');

    return (
        <div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-800 p-1 rounded-lg flex gap-1">
                    <button onClick={() => setActiveSection('strength')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'strength' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Strength</button>
                    <button onClick={() => setActiveSection('nutrition')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'nutrition' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Nutrition</button>
                    <button onClick={() => setActiveSection('tactics')} className={`py-2 px-6 rounded-md text-sm font-semibold transition ${activeSection === 'tactics' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-300'}`}>Tactics</button>
                </div>
            </div>
            {activeSection === 'strength' && <StrengthTab onExerciseSelect={onExerciseSelect} />}
            {activeSection === 'nutrition' && <NutritionCoachTab />}
            {activeSection === 'tactics' && <TacticsTab userData={userData} />}
        </div>
    );
};

// --- TACTICS TAB COMPONENTS ---

const FormationDiagram = ({ formation, onPositionSelect, selectedPositionId }) => {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-[2/3] bg-green-600 border-4 border-gray-500 rounded-lg overflow-hidden">
            {/* Pitch Markings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 border-2 border-green-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-16 md:h-20 border-2 border-green-400 rounded-b-lg border-t-0"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 md:h-20 border-2 border-green-400 rounded-t-lg border-b-0"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 border-b-2 border-green-400"></div>

            {/* Players */}
            {formation.players.map(player => (
                <button 
                    key={player.id}
                    onClick={() => onPositionSelect(player)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200
                        ${selectedPositionId === player.id ? 'bg-yellow-400 text-black scale-110 shadow-lg' : 'bg-gray-900 text-white hover:bg-yellow-400 hover:text-black'}`}
                    style={{ top: player.top, left: player.left }}
                >
                    {player.id}
                </button>
            ))}
        </div>
    );
};

const AiTactician = ({ formation, position }) => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSearch = async () => {
        if (!query.trim() || isLoading) return;

        const newUserMessage = { role: 'user', text: query };
        setChatHistory(prev => [...prev, newUserMessage]);
        setQuery('');
        setIsLoading(true);

        const context = `The user is currently viewing the ${formation.name} formation. They have selected the ${position ? position.name + ' (' + position.id + ')' : 'general formation'}.`;

        const prompt = `You are an expert, friendly, and approachable soccer tactician. A user wants tactical advice. Your goal is to provide a helpful, human-like, and conversational response.
        
        Current Context: ${context}
        User's Question: "${query}"

        Explain the 'why' behind tactical concepts in simple terms. 
        **IMPORTANT: Keep your response to a maximum of 3 sentences, unless the user specifically asks for more detail. Do not use bullet points.**`;

        try {
            let apiChatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: apiChatHistory };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            
            setChatHistory(prev => [...prev, { role: 'coach', text: responseText }]);

        } catch (error) {
            console.error("Error with AI Tactician:", error);
            setChatHistory(prev => [...prev, { role: 'coach', text: "I'm sorry, I was unable to process that tactical query. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Ask the AI Tactician</h3>
             <div ref={chatContainerRef} className="flex-grow bg-gray-800 rounded-lg p-4 space-y-4 overflow-y-auto mb-4 min-h-[30vh] max-h-[40vh]">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'coach' && <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>}
                        <div className={`p-3 rounded-lg max-w-md text-white ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                           <p className="whitespace-pre-line">{message.text}</p>
                        </div>
                        {message.role === 'user' && <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="User" className="text-white" /></div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>
                         <div className="p-3 rounded-lg max-w-sm bg-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            </div>
                         </div>
                     </div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g., How do I beat an offside trap?"
                    className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button onClick={handleSearch} disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg disabled:bg-gray-500">
                    <Icon name="Send" />
                </button>
            </div>
        </div>
    )
}


const TacticsTab = ({ userData }) => {
    const [selectedFormation, setSelectedFormation] = useState(formationsData["4-4-2"]);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleFormationChange = (e) => {
        setSelectedFormation(formationsData[e.target.value]);
        setSelectedPosition(null); // Reset position when formation changes
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-400">Tactics Board</h2>
                <p className="text-gray-400 mt-2">Select a formation, click a position to learn its role, and ask the AI Tactician for advice.</p>
            </div>

            <div className="mb-6">
                <label htmlFor="formation-select" className="block text-sm font-medium text-gray-400 mb-2">Select Formation:</label>
                <select 
                    id="formation-select" 
                    onChange={handleFormationChange}
                    value={selectedFormation.name}
                    className="bg-gray-800 border border-gray-700 text-white text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                >
                    {Object.keys(formationsData).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-center">{selectedFormation.name}</h3>
                    <FormationDiagram 
                        formation={selectedFormation} 
                        onPositionSelect={setSelectedPosition}
                        selectedPositionId={selectedPosition?.id}
                    />
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    {selectedPosition ? (
                        <div>
                            <h3 className="text-2xl font-bold text-yellow-400">{selectedPosition.name} ({selectedPosition.id})</h3>
                            <p className="text-gray-300 mt-2 whitespace-pre-line">{selectedPosition.role}</p>
                        </div>
                    ) : (
                        <div className="text-center h-full flex flex-col justify-center">
                             <h3 className="text-2xl font-bold text-gray-400">Select a Position</h3>
                             <p className="text-gray-500 mt-2">Click on a player in the diagram to see their role and responsibilities in the {selectedFormation.name} formation.</p>
                        </div>
                    )}
                </div>
            </div>
            <AiTactician formation={selectedFormation} position={selectedPosition} />
        </div>
    );
};

// --- STRENGTH TAB (formerly Conditioning) ---

const StrengthTab = ({ onExerciseSelect }) => {
    const [workoutFocus, setWorkoutFocus] = useState('Lower Body Power');
    const [workoutDuration, setWorkoutDuration] = useState('30 Minutes');
    const [injuryInfo, setInjuryInfo] = useState('');
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateWorkout = async () => {
        setIsLoading(true);
        setGeneratedPlan(null);
        
        const prompt = `You are an expert sports performance coach for soccer players. Create a soccer-specific strength and conditioning workout plan based on the following user choices.

        Focus: ${workoutFocus}
        Duration: ${workoutDuration}
        Player's Injuries: ${injuryInfo || 'None'}

        The plan must be a JSON object with the following structure:
        {
          "title": "...",
          "summary": "...",
          "warmUp": [ { "exercise": "...", "duration": "..." } ],
          "mainSet": [ { "exercise": "...", "sets": "...", "reps": "..." } ],
          "coolDown": [ { "exercise": "...", "duration": "..." } ]
        }
        
        Ensure the exercises are suitable for a player to do with minimal equipment. The number of exercises and sets should be appropriate for the chosen duration.
        VERY IMPORTANT: If the user has listed injuries, you MUST avoid exercises that would strain that area. Suggest safe alternatives or modifications. For example, if they have a sore knee, avoid high-impact jumps and suggest static holds or low-impact alternatives.`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { 
                contents: chatHistory,
                generationConfig: { responseMimeType: "application/json" }
            };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            const parsedPlan = JSON.parse(responseText);
            setGeneratedPlan(parsedPlan);

        } catch (error) {
            console.error("Error generating workout plan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExerciseClick = (exerciseName) => {
        const exerciseDetails = exerciseData[exerciseName];
        if (exerciseDetails) {
            onExerciseSelect({ name: exerciseName, ...exerciseDetails });
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-400">Strength Workout Generator</h2>
            <p className="text-center text-gray-400 mb-8">Select your focus and desired workout time, and the AI will generate a soccer-specific session for you.</p>

            {!generatedPlan && (
                <div className="bg-gray-800 p-6 rounded-lg space-y-4 mb-8">
                    <div>
                        <label htmlFor="focus-select" className="block text-sm font-medium text-gray-300 mb-2">Workout Focus:</label>
                        <select id="focus-select" value={workoutFocus} onChange={(e) => setWorkoutFocus(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                            <option>Lower Body Power</option>
                            <option>Core Stability</option>
                            <option>Full Body Strength</option>
                            <option>Agility & Coordination</option>
                            <option>Injury Prevention</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="duration-select" className="block text-sm font-medium text-gray-300 mb-2">Duration:</label>
                        <select id="duration-select" value={workoutDuration} onChange={(e) => setWorkoutDuration(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                            <option>15 Minutes</option>
                            <option>30 Minutes</option>
                            <option>45 Minutes</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="injury-info" className="block text-sm font-medium text-gray-300 mb-2">Any injuries to be aware of? (Optional)</label>
                        <input
                            type="text"
                            id="injury-info"
                            value={injuryInfo}
                            onChange={(e) => setInjuryInfo(e.target.value)}
                            placeholder="e.g., sore right knee, tight hamstrings"
                            className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                    </div>
                    <button onClick={handleGenerateWorkout} disabled={isLoading} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-500 flex items-center justify-center">
                        {isLoading ? 'Generating Plan...' : 'Generate Workout'}
                    </button>
                </div>
            )}

            {isLoading && <p className="text-center">Your personal trainer is building your workout...</p>}

            {generatedPlan && (
                <div className="animate-fade-in">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{generatedPlan.title}</h3>
                        <p className="text-gray-400 italic mb-6">{generatedPlan.summary}</p>
                        
                        <div>
                            <h4 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2 mb-3">Warm-Up</h4>
                            <ul className="space-y-2">
                                {generatedPlan.warmUp.map((item, index) => (
                                    <li key={index} className="flex justify-between p-2 bg-gray-900 rounded-md">
                                        <button onClick={() => handleExerciseClick(item.exercise)} className="text-left hover:text-yellow-400">{item.exercise}</button>
                                        <span className="font-mono text-gray-400">{item.duration}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="my-6">
                            <h4 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2 mb-3">Main Set</h4>
                             <ul className="space-y-2">
                                {generatedPlan.mainSet.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 bg-gray-900 rounded-md">
                                        <button onClick={() => handleExerciseClick(item.exercise)} className="text-left hover:text-yellow-400">{item.exercise}</button>
                                        <span className="font-mono text-gray-400">{item.sets} x {item.reps}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         <div>
                            <h4 className="text-xl font-bold text-green-400 border-b border-gray-700 pb-2 mb-3">Cool-Down</h4>
                            <ul className="space-y-2">
                                {generatedPlan.coolDown.map((item, index) => (
                                    <li key={index} className="flex justify-between p-2 bg-gray-900 rounded-md">
                                        <button onClick={() => handleExerciseClick(item.exercise)} className="text-left hover:text-yellow-400">{item.exercise}</button>
                                        <span className="font-mono text-gray-400">{item.duration}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <AiStrengthCoach workoutPlan={generatedPlan} setWorkoutPlan={setGeneratedPlan} />
                </div>
            )}
        </div>
    );
};

const AiStrengthCoach = ({ workoutPlan, setWorkoutPlan }) => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSearch = async () => {
        if (!query.trim() || isLoading) return;

        const newUserMessage = { role: 'user', text: query };
        setChatHistory(prev => [...prev, newUserMessage]);
        setQuery('');
        setIsLoading(true);

        const prompt = `You are a friendly and simple strength coach AI. You have already provided the user with this workout plan: ${JSON.stringify(workoutPlan)}.
        
        The user now has a follow-up request: "${query}"
        
        Your task is to respond.
        - If the user asks for a change (e.g., "replace squats with something else", "add more core work"), generate a NEW, COMPLETE workout plan in the *exact same JSON format* as the original. Your entire response should be ONLY the JSON object.
        - If the user is just asking a question (e.g., "why are squats important?"), provide a simple, conversational answer. Your entire response should be ONLY the text answer, limited to a maximum of 3 sentences.`;

        try {
            let apiChatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: apiChatHistory };
            const apiKey = ""; // IMPORTANT: Add your Google Gemini API key here
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            
            try {
                // Try to parse as JSON first. If it works, it's a new plan.
                const newPlan = JSON.parse(responseText);
                if (newPlan.title && newPlan.mainSet) {
                    setWorkoutPlan(newPlan);
                    setChatHistory(prev => [...prev, { role: 'coach', text: "No problem, I've updated your workout plan for you!" }]);
                } else {
                   throw new Error("Not a valid plan.")
                }
            } catch (e) {
                // If it fails, it's a regular text response.
                setChatHistory(prev => [...prev, { role: 'coach', text: responseText }]);
            }

        } catch (error) {
            console.error("Error with AI Strength Coach:", error);
            setChatHistory(prev => [...prev, { role: 'coach', text: "Sorry, I couldn't process that request. Try asking in a different way." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Chat with your Strength Coach</h3>
             <div ref={chatContainerRef} className="flex-grow bg-gray-800 rounded-lg p-4 space-y-4 overflow-y-auto mb-4 min-h-[30vh] max-h-[40vh]">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'coach' && <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>}
                        <div className={`p-3 rounded-lg max-w-md text-white ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                           <p className="whitespace-pre-line">{message.text}</p>
                        </div>
                        {message.role === 'user' && <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="User" className="text-white" /></div>}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><Icon name="Bot" className="text-white" /></div>
                         <div className="p-3 rounded-lg max-w-sm bg-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            </div>
                         </div>
                     </div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g., Can you replace squats?"
                    className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button onClick={handleSearch} disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg disabled:bg-gray-500">
                    <Icon name="Send" />
                </button>
            </div>
        </div>
    )
}


// --- MAIN APP COMPONENT ---

export default function App() {
    const [userData, setUserData] = useState(null);

    // This effect will run once when the component mounts to load data from localStorage
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('soccerProUserData');
            if (savedData) {
                setUserData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
            // If parsing fails, start fresh
            setUserData(null);
        }
    }, []);

    // This effect will run whenever userData changes, saving it to localStorage
    useEffect(() => {
        if (userData) {
            try {
                localStorage.setItem('soccerProUserData', JSON.stringify(userData));
            } catch (error) {
                console.error("Failed to save user data to localStorage", error);
            }
        } else {
             // If userData is null (e.g., on reset), remove it from storage
             localStorage.removeItem('soccerProUserData');
        }
    }, [userData]);


    if (!userData) {
        return <PositionSelection setUserData={setUserData} />;
    }

    return <Dashboard userData={userData} setUserData={setUserData} />;
}
