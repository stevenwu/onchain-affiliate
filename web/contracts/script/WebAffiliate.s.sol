// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/Web3Affiliate.sol";

contract Web3AffiliateContractScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        new Web3AffiliateContract();
        vm.stopBroadcast();
    }
}
