// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {RockPaperScissors} from "../src/RockPaperScissors.sol";

contract DeployScript is Script {
    function run() public {
        // load env variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // start broadcasting transactions from the deployer account
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying contracts...");

        RockPaperScissors rockPaperScissors = new RockPaperScissors();

        console.log(
            "RockPaperScissors deployed at address: ",
            address(rockPaperScissors)
        );

        vm.stopBroadcast();
    }
}
