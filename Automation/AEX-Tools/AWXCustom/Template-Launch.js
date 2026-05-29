const axios = require('axios');


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function launchTemplate(gatewayBaseURL, gatewayAccessToken, launchTemplateEndpoint, templateId, data) {

    const payload = JSON.stringify({
        "path_parameters": {
            "query": templateId
        },
        "request_body": {
            "extra_vars": data
        }
    });

    const config = {
        method: 'post',
        url: gatewayBaseURL + launchTemplateEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + gatewayAccessToken
        },
        data: payload
    };

    try {
        const response = await axios.request(config);

        console.log("Launch Template Response:", response.data);

        return {
            status: "success",
            fullResponse: response.data
        };

    } catch (error) {
        console.error("Launch Template Error:", error.response?.data || error.message);

        return {
            status: "error",
            message: error.response?.data || error.message
        };
    }
}


async function getJobDetails(gatewayBaseURL, gatewayAccessToken, getJobDetailsEndpoint, jobId) {
    //AWX Gather Job Info

    let data = JSON.stringify({
        "path_parameters": {
            "query": jobId
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: gatewayBaseURL + getJobDetailsEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + gatewayAccessToken
        },
        data: data
    };

    try {
        const response = await axios.request(config);

        console.log("Job Details Response:", response.data);

        return {
            status: "success",
            fullResponse: response.data
        };

    } catch (error) {
        console.error("Job Details Error:", error.response?.data || error.message);

        return {
            status: "error",
            message: error.response?.data || error.message
        };
    }

}


async function getJobOutput(gatewayBaseURL, gatewayAccessToken, getJobOutputEndpoint, jobId) {

    let data = JSON.stringify({
        "path_parameters": {
            "query": jobId
        }
    });

    const config = {
        method: 'post', // or GET depending on your gateway
        url: gatewayBaseURL + getJobOutputEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + gatewayAccessToken
        },
        data: data
    };

    try {
        const response = await axios.request(config);

        console.log("Job Output Response:", response.data);

        return {
            status: "success",
            output: response.data
        };

    } catch (error) {
        console.error("Job Output Error:", error.response?.data || error.message);

        return {
            status: "error",
            message: error.response?.data || error.message
        };
    }
}


async function main(params) {

    const gatewayBaseURL = params.$GLOBAL.BIGFIX_GATEWAY_DEV_URL
    const gatewayAccessToken = params.$GLOBAL.BIGFIX_GATEWAY_DEV_ACCESSTOKEN
    const launchTemplateEndpoint = params.$GLOBAL.AWX_DEV.launchTemplateEndpoint
    const getJobDetailsEndpoint = params.$GLOBAL.AWX_DEV.getJobDetailsEndpoint
    const getJobOutputEndpoint = params.$GLOBAL.AWX_DEV.getJobOutputEndpoint
    const templateId = `${params?.prevStep?.details.body.templateId}`;
    let data = `${params?.prevStep?.details.body.data}`;
    console.log("Template Launch - Data: " + data);
    data = JSON.parse(data);
    
    var launchResult = await launchTemplate(gatewayBaseURL, gatewayAccessToken, launchTemplateEndpoint, templateId, data);

    if (launchResult.status == "failed") {
        return launchResult;
    }

    var jobId = launchResult.fullResponse.id;

    let jobDetails;

    while (true) {

        jobDetails = await getJobDetails(gatewayBaseURL, gatewayAccessToken, getJobDetailsEndpoint, jobId);

        if (jobDetails.status !== "success") {
            return jobDetails;
        }

        const jobStatus = jobDetails.fullResponse.status;

        console.log("Current Job Status:", jobStatus);

        if (jobStatus !== "running") {
            break;
        }

        await delay(5000);
    }
    
    await delay(5000);

    const jobOutput = await getJobOutput(gatewayBaseURL, gatewayAccessToken, getJobOutputEndpoint, jobId);

    if (jobOutput.status == "failed") {
        return jobOutput;
    }

    return jobOutput.output;

    // return {
    //     jobDetails: jobDetails.fullResponse,
    //     jobOutput: jobOutput.output.content
    // };

}
