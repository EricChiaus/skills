/**
 * Two Sum Problem - LeetCode #1
 * Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * Solve the Two Sum problem using a hash map for O(n) time complexity.
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} target - Integer target sum
 * @returns {number[]} Array of two indices [i, j] where nums[i] + nums[j] === target
 *                        Returns empty array if no solution found
 */
function twoSum(nums, target) {
    // Hash map to store value -> index mapping
    // Using Map for better performance with frequent lookups
    const seen = new Map();
    
    // Iterate through the array once
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        
        // Calculate the complement needed to reach target
        // complement = target - currentNum
        const complement = target - currentNum;
        
        // Check if complement exists in our hash map
        // This is O(1) lookup time
        if (seen.has(complement)) {
            // Found the pair! Return indices
            // seen.get(complement) gives us the index of the complement
            return [seen.get(complement), i];
        }
        
        // Store current number and its index for future lookups
        // This allows us to find the complement in subsequent iterations
        seen.set(currentNum, i);
    }
    
    // No solution found (though LeetCode guarantees one solution exists)
    return [];
}

/**
 * Test suite for the twoSum function
 * Comprehensive testing to ensure correctness across various scenarios
 */
function testTwoSum() {
    // Test case 1: Basic example from LeetCode
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    const result1 = twoSum(nums1, target1);
    console.log(`Test 1: nums=${JSON.stringify(nums1)}, target=${target1}, result=${JSON.stringify(result1)}`);
    console.assert(JSON.stringify(result1) === JSON.stringify([0, 1]), 
        `Expected [0, 1], got ${JSON.stringify(result1)}`);
    
    // Test case 2: Negative numbers
    const nums2 = [-3, 4, 3, 90];
    const target2 = 0;
    const result2 = twoSum(nums2, target2);
    console.log(`Test 2: nums=${JSON.stringify(nums2)}, target=${target2}, result=${JSON.stringify(result2)}`);
    console.assert(JSON.stringify(result2) === JSON.stringify([0, 2]), 
        `Expected [0, 2], got ${JSON.stringify(result2)}`);
    
    // Test case 3: No solution (edge case)
    const nums3 = [1, 2, 3];
    const target3 = 7;
    const result3 = twoSum(nums3, target3);
    console.log(`Test 3: nums=${JSON.stringify(nums3)}, target=${target3}, result=${JSON.stringify(result3)}`);
    console.assert(JSON.stringify(result3) === JSON.stringify([]), 
        `Expected [], got ${JSON.stringify(result3)}`);
    
    // Test case 4: Duplicate numbers
    const nums4 = [3, 3];
    const target4 = 6;
    const result4 = twoSum(nums4, target4);
    console.log(`Test 4: nums=${JSON.stringify(nums4)}, target=${target4}, result=${JSON.stringify(result4)}`);
    console.assert(JSON.stringify(result4) === JSON.stringify([0, 1]), 
        `Expected [0, 1], got ${JSON.stringify(result4)}`);
    
    // Test case 5: Large numbers
    const nums5 = [2147483647, -2147483648, 0];
    const target5 = -1;
    const result5 = twoSum(nums5, target5);
    console.log(`Test 5: nums=${JSON.stringify(nums5)}, target=${target5}, result=${JSON.stringify(result5)}`);
    console.assert(JSON.stringify(result5) === JSON.stringify([1, 2]), 
        `Expected [1, 2], got ${JSON.stringify(result5)}`);
    
    console.log("✅ All tests passed!");
}

// Alternative approach: Brute force (for comparison)
/**
 * Brute force solution for Two Sum problem
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * This approach is less efficient but simpler to understand
 * Useful for explaining why we need the hash map approach
 */
function twoSumBruteForce(nums, target) {
    // Nested loops to check all possible pairs
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            // Check if the current pair sums to target
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return [];
}

/**
 * Test the brute force approach to verify correctness
 */
function testBruteForce() {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSumBruteForce(nums, target);
    console.log(`Brute Force Test: nums=${JSON.stringify(nums)}, target=${target}, result=${JSON.stringify(result)}`);
    console.assert(JSON.stringify(result) === JSON.stringify([0, 1]), 
        `Brute force failed: Expected [0, 1], got ${JSON.stringify(result)}`);
    console.log("✅ Brute force test passed!");
}

// Run all tests when this file is executed
if (typeof module !== 'undefined' && require.main === module) {
    testTwoSum();
    testBruteForce();
}

// Export functions for use in other modules
if (typeof module !== 'undefined') {
    module.exports = {
        twoSum,
        twoSumBruteForce,
        testTwoSum,
        testBruteForce
    };
}

/*
 * Interview talking points and explanation:
 * 
 * 1. Problem Understanding:
 *    - We need to find two numbers that add up to target
 *    - Return their indices, not the numbers themselves
 *    - Each input has exactly one solution (LeetCode guarantee)
 *    - Can't use the same element twice
 * 
 * 2. Approach Discussion:
 *    - Brute force: O(n²) time, O(1) space - check all pairs
 *    - Hash map: O(n) time, O(n) space - optimal solution
 *    - Two pointers: O(n log n) time due to sorting, O(1) space
 *      but we lose original indices, so not suitable here
 * 
 * 3. Algorithm Selection:
 *    - Hash map is best for this problem
 *    - Store seen numbers and their indices
 *    - For each number, check if complement exists in map
 *    - If found, return the pair of indices
 * 
 * 4. Implementation Details:
 *    - Use Map() for O(1) average case lookups
 *    - Single pass through array for O(n) time
 *    - Store complement check before storing current number
 *      to avoid using the same element twice
 * 
 * 5. Time/Space Complexity:
 *    - Time: O(n) - one pass through array
 *    - Space: O(n) - storing hash map of seen elements
 * 
 * 6. Edge Cases:
 *    - No solution (though problem guarantees one)
 *    - Negative numbers
 *    - Duplicate numbers
 *    - Large arrays
 *    - Integer overflow (JavaScript handles big numbers)
 * 
 * 7. Testing Strategy:
 *    - Basic functionality test
 *    - Edge cases (negative numbers, duplicates)
 *    - Boundary conditions (empty array, large numbers)
 *    - Compare with brute force for verification
 */
