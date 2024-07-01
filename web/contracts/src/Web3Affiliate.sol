// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/console.sol";

contract Web3AffiliateContract {
    struct Referral {
        address affiliate;
        uint48 signupDate;
        string source;
    }

    uint256 payoutAmount = 2000000; // 0.002 ether

    receive() external payable {}

    address public owner;
    mapping(address => Referral) public referrals;

    constructor() {
        owner = msg.sender;
    }

    function sendPayment(address payable recipient) public {
        (bool success,) = recipient.call{value: payoutAmount}("");
        require(success, "Transfer failed");
    }

    function createReferral(address _affiliate, address _customer, uint48 _date, string memory _source) external {
        console.log("values %s %s %s", _affiliate, _customer, _date);
        console.logString(_source);

        require(referrals[_customer].affiliate == address(0), "Customer already has a referral");

        referrals[_customer] = Referral({affiliate: _affiliate, signupDate: _date, source: _source});
    }

    function getReferrals(address _customer) public view returns (Referral memory) {
        console.log("_customer address: %s", _customer);
        return referrals[_customer];
    }

    function hasReferral(address _customer) public view returns (bool) {
        return referrals[_customer].affiliate != address(0);
    }

    function payAffiliate(address _customer) public {
        console.log("payAffiliate sender: %s", msg.sender);
        require(msg.sender == 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

        (bool sent,) = referrals[_customer].affiliate.call{value: payoutAmount}("");
        console.log("affiliate: %s", referrals[_customer].affiliate]);
        require(sent, "Failed to pay affiliate");
    }
}
