const assert = require('assert');
const systemEngine = require('../src/engine/systemEngine');

async function runTests() {
    console.log("Starting minimal tests...");

    // 1. Valid Query Test - Registration
    const res1 = await systemEngine.processRequest("How do I register as a first time voter?");
    assert.strictEqual(res1.context.intent, 'registration', "Intent should be registration");
    assert.strictEqual(res1.context.userType, 'new_voter', "User type should be new_voter");
    assert.strictEqual(res1.decision.stage, 'Voter Registration', "Stage should be Voter Registration");
    console.log("✅ Test 1 Passed: Valid Registration Query");

    // 2. Valid Query Test - Voting Day
    const res2 = await systemEngine.processRequest("What do I bring on voting day?");
    assert.strictEqual(res2.context.intent, 'voting_day', "Intent should be voting_day");
    console.log("✅ Test 2 Passed: Valid Voting Day Query");

    // 3. Unknown/Empty Query Test
    const res3 = await systemEngine.processRequest("");
    assert.strictEqual(res3.context.intent, 'general', "Empty query should fallback to general");
    assert.strictEqual(res3.context.userType, 'unknown', "Empty query should have unknown user type");
    console.log("✅ Test 3 Passed: Empty Query Fallback");

    console.log("All minimal tests passed successfully.");
}

runTests().catch(err => {
    console.error("Test failed:", err);
    process.exit(1);
});
