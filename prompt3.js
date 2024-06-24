import OpenAI from "openai";
import data from './questions.json' assert { type: 'json' };

const openai = new OpenAI();

async function callAPI(carModel, question, imageUrl) {
    const prompt = `
You are an expert on the ${carModel} car. You are answering the following question from a user about an image:
"${question}"
To answer the question about the image, describe the image with text and create a response based on it. If you need to refer to the vehicle's owner's manual, provide only a description of the image.

    Output:
    In JSON format only. Do not include headers or delimiters, and avoid unicode espcape.
    {{
        "original_question": Repeat the user's question,
        "lookup_manual": True if you need to refer to the owner's manual, False otherwise,
        "response_to_user": Response to the user's question,
        "question_to_manual": What you would ask the manual,
    }}
`
    console.log("Prompt ====================");
    console.log(prompt);
    console.log("===========================");

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: {
            "type": "json_object"
        },
        messages: [
            {
                role: "user", // "system" is not allowed
                content: [
                    {
                        type: "text",
                        text: prompt
                    },
                    {
                        type: "image_url",
                        image_url: {
                            "url": imageUrl,
                        },
                    },
                ],
            },
        ],
    });
    console.log("Response ------------------");
    console.log(response.choices[0].message.content);
    console.log("---------------------------");
}

async function main() {
    const carModel = "Hoda Fit 2015 model"

    const activeQuestions = [];
    activeQuestions.push('rear_wiper');
    // activeQuestions.push('diehard_battery');
    // activeQuestions.push('car_jumper');
    // activeQuestions.push('dashboard_light');
    // activeQuestions.push('tire');
    // activeQuestions.push('antenna');
    // activeQuestions.push('gas_cap');
    // activeQuestions.push('security_label');
    // activeQuestions.push('blue_sign');
    // activeQuestions.push('mileage_meter');
    // activeQuestions.push('orange_sign');
    // activeQuestions.push('ac_mode');
    // activeQuestions.push('ac_lever');
    // activeQuestions.push('econ_button');

    for (let q of data) {
        if (activeQuestions.includes(q.name)) {
            await callAPI(carModel, q.question, q.url);
        }
    }
}
main();

/*
API Results:
{
    "original_question": "What is the name of this part?",
    "lookup_manual": false,
    "response_to_user": "The part in the image is a rear windshield wiper.",
    "question_to_manual": ""
}

{ 
    "original_question": "Can this battery be used for Toyota Corolla 2020?", 
    "lookup_manual": true, 
    "response_to_user": "To determine if this battery can be used for a Toyota Corolla 2020, we need to refer to the vehicle's owner's manual to check the battery specifications required, such as CCA (Cold Cranking Amps), dimensions, terminal type, and compatibility.",
    "question_to_manual": "What are the required specifications for the battery of a Toyota Corolla 2020, including CCA, dimensions, and terminal type?" 
}

{
    "original_question": "Where am I supposed to connect wires for jump starting?",
    "lookup_manual": true,
    "response_to_user": "From the image, I can see the vehicle's engine bay, and I can identify the battery. The positive battery terminal has a red positive (+) cap on it, and the negative terminal is usually marked with a minus (-) symbol. For specific locations and safety instructions, it's best to refer to your vehicle's owner's manual.",
    "question_to_manual": "Where exactly do I connect the wires for jump starting, and what safety precautions should I follow?"
}

{   
    "original_question": "What does this sign mean?",   
    "lookup_manual": true,   
    "response_to_user": "The image shows a dashboard with a warning light illuminated. The symbol that is lit appears to be the check engine light, indicating that there may be an issue with the engine or emissions system. However, for an accurate interpretation, it is recommended to check the vehicle's owner's manual for detailed information.",   
    "question_to_manual": "What does the illuminated check engine light symbol indicate?"   
}

{
    "original_question": "Can this battery used for Toyota Corolla 2020?",
    "lookup_manual": false,
    "response_to_user": "The image you provided shows a car wheel, which does not help in identifying whether a specific battery can be used for a Toyota Corolla 2020. To answer this question, I would need information about the battery specifications.",
    "question_to_manual": "What type and specification of battery is suitable for a Toyota Corolla 2020?"
}

{  
    "original_question": "What does this sign mean?",  
    "lookup_manual": true,  
    "response_to_user": "The image shows an instrument panel with various indicators. The illuminated sign in yellow looks like an engine shape and likely indicates a check engine or malfunction indicator light, which suggests there might be an issue with the engine or emissions system. For a precise interpretation, it's essential to refer to the owner's manual.",
    "question_to_manual": "What does the yellow engine-shaped warning light on the instrument panel indicate in a 2015 Honda Fit?"  
}

{   
    "original_question": "Can this battery be used for Toyota Corolla 2020?",   
    "lookup_manual": 1,
    "response_to_user": "The image you've provided shows a wheel of a Honda vehicle, likely indicating you're inquiring if a battery from a Honda Fit 2015 is compatible with a Toyota Corolla 2020. Without seeing the actual battery specifications, it's best to refer to the owner's manual for both vehicles to verify compatibility.",
    "question_to_manual": "What are the specifications of the battery required for a Toyota Corolla 2020?"
}

{ 
    "original_question": "What's the type of tire I could use for this car?",
    "lookup_manual": true,
    "response_to_user": "To determine the appropriate type of tire for your 2015 Honda Fit, it's best to refer to the vehicle's owner's manual for detailed specifications. Based on the image, the tire appears to be a standard size that fits the factory wheel of a 2015 Honda Fit, but the exact size and specifications will be listed in your owner's manual.",
    "question_to_manual": "What are the recommended tire specifications and sizes for the 2015 Honda Fit?"
}

{ 
    "original_question": "What's the name? What is this antenna for?", 
    "lookup_manual": false, 
    "response_to_user": "The image shows a roof-mounted antenna on the car. This antenna is typically used for radio reception, allowing you to receive AM/FM radio signals in your vehicle.",
    "question_to_manual": ""
}

{ 
    "original_question": "What's the name of this antenna? What is it for?", 
    "lookup_manual": false, 
    "response_to_user": "The antenna in the image is commonly referred to as a 'roof antenna' or 'whip antenna.' It is primarily used for receiving radio signals, allowing you to listen to AM/FM radio stations in your car.", 
    "question_to_manual": ""
}

{  
    "original_question": "How can I open this?",  
    "lookup_manual": true,  
    "response_to_user": "It appears that you are referring to the fuel door of your Honda Fit 2015. Usually, the fuel door can be opened by a lever or button inside the car, often located near the driver's seat. Please refer to the owner's manual for precise instructions on the exact location and method for opening the fuel door.",  
    "question_to_manual": "What is the exact method and location for opening the fuel door on a Honda Fit 2015?"
}

{ 
    "original_question": "What's the meaning of this sticker?", 
    "lookup_manual":  false, 
    "response_to_user": "This sticker is from KARR Security Systems, indicating that the vehicle is equipped with a security system provided by KARR.", 
    "question_to_manual": "" 
}

{ 
    "original_question": "What's the meaning of this blue sign?", 
    "lookup_manual": true, 
    "response_to_user": "The blue sign displayed on the dashboard appears to be an indicator light, but I would need to refer to the vehicle's owner's manual to provide you with an accurate description of its meaning.", 
    "question_to_manual": "What does the blue indicator light on the tachometer, resembling a thermometer with waves below it, signify in the Hoda Fit 2015 model?" 
}

{ 
    "original_question": "How can I reset the 'Trip A' meter? on the second line",
    "lookup_manual": false,
    "response_to_user": "To reset the 'Trip A' meter on a 2015 Honda Fit, you need to locate the trip button. In the provided image, the trip button should be on the dashboard, typically near or on the instrument cluster. Press and hold this button until the 'Trip A' meter resets to zero.",
    "question_to_manual": ""
}

    "original_question": "What's the meaning of this orange sign, depicting a seat belted person with 'OFF' and '2' number?",
    "lookup_manual": true,
    "response_to_user": "The orange sign displaying a seated person with the words 'OFF' and the number '2' generally relates to the passenger airbag system. The 'OFF' indicates that the passenger airbag is deactivated, and '2' might refer to the status or type of activation/deactivation. Please refer to your vehicle's owner's manual for exact details and explanations specific to the 2015 Honda Fit.",
    "question_to_manual": "What does the orange sign depicting a seated person with 'OFF' and the number '2' mean in the 2015 Honda Fit?"
}

{ 
    "original_question": "Explain difference among these AC modes.",
    "lookup_manual": true,
    "response_to_user": "The image shows several air conditioning modes for a vehicle. It's advisable to refer to the vehicle's owner's manual for detailed descriptions. In general, the modes may include settings for different airflow directions, such as towards the face, towards the feet, or a combination of both. Some modes may also include defrosting for the windshield.",
    "question_to_manual": "What are the specific functions for each AC mode depicted in the 2015 Honda Fit?"
}

{ 
    "original_question": "Explain this horizontal lever affecting AC.", 
    "lookup_manual": true, 
    "response_to_user": "The horizontal lever in the image appears to control the air circulation mode of the HVAC system in your 2015 Honda Fit. The lever can be shifted between two positions: one for recirculating the interior air and the other for drawing in fresh air from outside the vehicle. Consult your owner's manual for detailed instructions on how to use this feature and any specific operational guidelines.", 
    "question_to_manual": "How does the horizontal lever that controls air circulation in the 2015 Honda Fit's HVAC system function, and what are the recommended settings for different conditions?" 
}

{  
    "original_question": "What's this green button labeled 'ECON'?",  
    "lookup_manual": false,  
    "response_to_user": "The green button labeled 'ECON' is the ECON button in your Honda Fit 2015 model. When you press this button, it activates the ECON mode, which optimizes the vehicle's fuel efficiency by adjusting the performance of the engine, transmission, air conditioning, and cruise control to save fuel.",  
    "question_to_manual": ""  
}

*/