import { Client } from "@gradio/client";

const generateImage = async () => {
    const client = await Client.connect("mukaist/DALLE-4K", { hf_token: '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' });
    const result = await client.predict("/run", { 		
        prompt: "Hello!!", 		
        negative_prompt: "Hello!!", 		
        use_negative_prompt: true, 		
        style: "3840 x 2160", 		
        seed: 0, 		
        width: 512, 		
        height: 512, 		
        guidance_scale: 0.1, 		
        randomize_seed: true, 
    });

    console.log(result.data);
};

export default generateImage;