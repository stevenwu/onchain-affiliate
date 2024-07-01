export const Web3AffiliateContractABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "createReferral",
    "inputs": [
      {
        "name": "_affiliate",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_customer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_date",
        "type": "uint48",
        "internalType": "uint48"
      },
      {
        "name": "_source",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getReferrals",
    "inputs": [
      {
        "name": "_customer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Web3AffiliateContract.Referral",
        "components": [
          {
            "name": "affiliate",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "signupDate",
            "type": "uint48",
            "internalType": "uint48"
          },
          {
            "name": "source",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasReferral",
    "inputs": [
      {
        "name": "_customer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "payAffiliate",
    "inputs": [
      {
        "name": "_customer",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "referrals",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "affiliate",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "signupDate",
        "type": "uint48",
        "internalType": "uint48"
      },
      {
        "name": "source",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "sendPayment",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address payable"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]
