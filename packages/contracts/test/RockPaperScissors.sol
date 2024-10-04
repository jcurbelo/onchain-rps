// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {RockPaperScissors} from "../src/RockPaperScissors.sol";

contract RockPaperScissorsTest is Test {
    RockPaperScissors public rockPaperScissors;

    function setUp() public {
        rockPaperScissors = new RockPaperScissors();
    }

    function testHelloWorld() public pure {
        console.log("Hello, World!");

        assertEq(true, true);
    }
}
