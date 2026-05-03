const gcpServices = require('../services/gcpServices');

/**
 * Stage 1: Context Builder
 * Analyzes the raw query to extract intent and determine user type.
 */
function buildContext(query) {
    const q = query.toLowerCase();
    let intent = 'general';
    let userType = 'unknown';

    // Basic heuristic to identify user type
    if (q.includes('first time') || q.includes('never voted') || q.includes('how do i register')) {
        userType = 'new_voter';
    } else if (q.includes('again') || q.includes('moved') || q.includes('update')) {
        userType = 'returning_voter';
    }

    // Basic heuristic to identify intent/stage
    if (q.includes('register') || q.includes('sign up')) {
        intent = 'registration';
    } else if (q.includes('where') || q.includes('polling') || q.includes('location')) {
        intent = 'verification';
    } else if (q.includes('day') || q.includes('bring') || q.includes('id') || q.includes('process')) {
        intent = 'voting_day';
    }

    return { query, intent, userType };
}

/**
 * Stage 3: Knowledge Flow Engine
 * The static, structured rules of the election process.
 */
const knowledgeBase = {
    registration: {
        title: "Voter Registration",
        steps: [
            "Check your eligibility (Age, Citizenship, Residency).",
            "Gather necessary documents (State ID or SSN).",
            "Submit your application online, by mail, or in person."
        ]
    },
    verification: {
        title: "Verification & Polling Location",
        steps: [
            "Verify your registration status online at least 30 days before the election.",
            "Locate your designated polling place.",
            "Check early voting options in your area."
        ]
    },
    voting_day: {
        title: "Voting Day Process",
        steps: [
            "Arrive at the correct polling place.",
            "Present required identification to the poll worker.",
            "Receive your ballot and proceed to the voting booth.",
            "Review your choices and cast your ballot."
        ]
    },
    general: {
        title: "General Election Process",
        steps: [
            "Step 1: Register to vote.",
            "Step 2: Verify registration and polling place.",
            "Step 3: Vote early or on Election Day."
        ]
    }
};

/**
 * Stage 2: Decision Engine (CRITICAL)
 * MUST NOT rely on AI. Uses rule-based logic to decide what info to provide.
 */
function decideFlow(context) {
    let selectedKnowledge = knowledgeBase[context.intent] || knowledgeBase.general;
    
    // Branching logic based on user type
    let tailoredAdvice = "";
    if (context.userType === 'new_voter') {
        tailoredAdvice = "As a first-time voter, make sure to bring a valid photo ID, as it is strictly required in most jurisdictions.";
    } else if (context.userType === 'returning_voter') {
        tailoredAdvice = "If you've recently moved, ensure your registration address is updated to vote in the correct precinct.";
    }

    return {
        stage: selectedKnowledge.title,
        baseSteps: selectedKnowledge.steps,
        advice: tailoredAdvice
    };
}

/**
 * Stage 4: Response Generator
 * Orchestrates the flow, calling GCP services.
 */
async function processRequest(userQuery) {
    // 1. Build Context
    const context = buildContext(userQuery);

    // 2. Decide Flow (Rule-based)
    const decision = decideFlow(context);

    // 3. Optional: Get dynamic data (MANDATORY BQ USAGE)
    const timelineData = await gcpServices.getElectionTimelineFromBigQuery();

    // 4. Generate Response (MANDATORY VERTEX AI USAGE)
    const dataForAI = {
        userType: context.userType,
        determinedStage: decision.stage,
        requiredSteps: decision.baseSteps,
        specialAdvice: decision.advice,
        timeline: timelineData
    };
    
    const aiExplanation = await gcpServices.generateExplanationWithVertexAI(dataForAI);

    // 5. Log Interaction (MANDATORY FIREBASE USAGE)
    await gcpServices.logInteractionToFirebase(userQuery, aiExplanation);

    // Return structured payload
    return {
        context: context,
        decision: decision,
        explanation: aiExplanation
    };
}

module.exports = {
    processRequest,
    knowledgeBase
};
