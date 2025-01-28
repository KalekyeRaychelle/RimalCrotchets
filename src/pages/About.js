import React from 'react'
import history from "../assets/history.jpg";
import aboutUs from "../assets/aboutUs.jpg";
import missionPic from "../assets/missionPic.webp"
import '../styles/About.css'
const About = () => {
    return (
        <div className='About'>
            <div className='aboutUs'>
                <img src={history} alt='About us'/>
                <div>
                    <h2>About Rimal's</h2>
                    <p>
                        Rimal’s Crochet began as a heartfelt hobby between two close friends,
                        Riya and Malia, who shared a passion for creating intricate handmade crafts.
                        What started as a creative pastime soon blossomed into a thriving business driven
                        by a love for unique and wearable art. At Rimal’s Crochet, our mission is simple:
                        to freely craft beautiful, manmade pieces that people can cherish and wear with pride.
                        Each item is a testament to our dedication to quality, creativity, and the joy of making
                        something special by hand.</p>
                    <button>Shop Now</button>
                </div>

            </div>
            <div className='history'>
                <div>
                    <h2> Our History</h2>
                    <p>
                        Rimal’s Crochet has its roots in the shared love of crafting between two friends, Riya and Malia.
                        What started as casual evenings spent experimenting with crochet patterns and techniques soon evolved
                        into something greater. Encouraged by friends and family who admired their unique pieces, the duo decided
                        to turn their hobby into a small business. Over time, their designs gained popularity, drawing attention for
                        their originality and meticulous craftsmanship. Today, Rimal’s Crochet stands as a testament to their journey—one 
                        that began with simple yarn and needles and grew into a thriving brand built on creativity, passion, and friendship.
                    </p>
                </div>
                <img src={aboutUs} alt='History'/>
            
            </div>
            <div className='values'>
                <img src={missionPic} alt='values'/>
                <div>
                    <h2>Our Values</h2>
                    <p>
                        At Rimal’s Crochet, our values are deeply rooted in integrity, creativity, and craftsmanship.
                        We believe in producing pieces that are not only beautiful but also ethically made. Every item
                        is carefully handcrafted, with no shortcuts or unethical practices involved in our process.
                        Our commitment to authenticity and quality ensures that every piece reflects the passion and 
                        care that went into making it. We value sustainability, originality, and the joy that handmade 
                        crafts bring to both creators and wearers. At the heart of Rimal’s Crochet is a dedication to creating meaningful,
                        wearable art while staying true to our principles
                    </p>
                   
                </div>

            </div>
            <div className='testimonials'>
                <h2>Testimonials</h2>
                <div className='stories'>
                    <p>
                        I absolutely love my crochet bag from Rimal's Crochet! The quality is amazing, 
                        and you can tell it’s made with so much care and attention to detail.
                        I always get compliments when I wear it!"
                        — Grace Mbinya.
                    </p>
                    <p>
                        "The handmade scarf I purchased was not only beautiful but so unique.
                        It’s rare to find such high-quality, ethical craftsmanship these days.
                        Rimal’s Crochet is truly one of a kind!"
                        — Daniel Muga.
                    </p>
                    <p>
                        I ordered a custom crochet piece for a friend’s birthday, and it was perfect! The team at Rimal’s 
                        Crochet worked with me to create something special, and my friend was overjoyed. Highly recommend!"
                        -Molly Omondi
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
