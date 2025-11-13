/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "FrqH4fpY2yGS2PT8ufEFcbbv9imZ1jd1qKTH9Fk6YGxB",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "completeMilestone",
      "discriminator": [
        137,
        164,
        160,
        100,
        33,
        64,
        178,
        10
      ],
      "accounts": [
        {
          "name": "sponsor",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "campaign.sponsor",
                "account": "campaign"
              },
              {
                "kind": "account",
                "path": "campaign.id",
                "account": "campaign"
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "beneficiary",
          "docs": [
            "is verified explicitly in the instruction logic below."
          ],
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "milestoneIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createCampaign",
      "discriminator": [
        111,
        131,
        187,
        98,
        160,
        193,
        114,
        244
      ],
      "accounts": [
        {
          "name": "sponsor",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "sponsor"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "totalAmount",
          "type": "u64"
        },
        {
          "name": "milestones",
          "type": {
            "vec": {
              "defined": {
                "name": "milestone"
              }
            }
          }
        },
        {
          "name": "beneficiary",
          "type": "pubkey"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "donate",
      "discriminator": [
        121,
        186,
        218,
        211,
        73,
        70,
        196,
        180
      ],
      "accounts": [
        {
          "name": "donor",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "donor"
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "config"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "recordVote",
      "discriminator": [
        184,
        0,
        179,
        29,
        33,
        23,
        130,
        220
      ],
      "accounts": [
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "campaign",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  109,
                  112,
                  97,
                  105,
                  103,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "campaign.sponsor",
                "account": "campaign"
              },
              {
                "kind": "account",
                "path": "campaign.id",
                "account": "campaign"
              }
            ]
          }
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "voter"
              }
            ]
          }
        },
        {
          "name": "voteReciept",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101,
                  95,
                  114,
                  101,
                  99,
                  105,
                  101,
                  112,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "config"
              },
              {
                "kind": "account",
                "path": "voter"
              },
              {
                "kind": "account",
                "path": "campaign"
              },
              {
                "kind": "arg",
                "path": "milestoneIndex"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "milestoneIndex",
          "type": "u8"
        },
        {
          "name": "isAgreed",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "campaign",
      "discriminator": [
        50,
        40,
        49,
        11,
        157,
        220,
        229,
        192
      ]
    },
    {
      "name": "governanceConfig",
      "discriminator": [
        81,
        63,
        124,
        107,
        210,
        100,
        145,
        70
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    },
    {
      "name": "voteReciept",
      "discriminator": [
        127,
        231,
        189,
        8,
        3,
        160,
        222,
        57
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidMilestoneAmount"
    },
    {
      "code": 6001,
      "name": "invalidTotalAmount"
    },
    {
      "code": 6002,
      "name": "invalidDonationAmount"
    },
    {
      "code": 6003,
      "name": "invalidTotalVotes"
    },
    {
      "code": 6004,
      "name": "invalidTotalAgreedVotes"
    },
    {
      "code": 6005,
      "name": "invalidTotalDisagreedVotes"
    },
    {
      "code": 6006,
      "name": "invalidMilestoneStatus"
    },
    {
      "code": 6007,
      "name": "invalidReputationScore"
    },
    {
      "code": 6008,
      "name": "invalidSponsor"
    },
    {
      "code": 6009,
      "name": "notAboveThreshold"
    },
    {
      "code": 6010,
      "name": "invalidBeneficiary"
    },
    {
      "code": 6011,
      "name": "milestoneThresholdCalculationError"
    },
    {
      "code": 6012,
      "name": "notEnoughVotes"
    },
    {
      "code": 6013,
      "name": "invalidMilestoneIndex"
    },
    {
      "code": 6014,
      "name": "milestoneNotPending"
    }
  ],
  "types": [
    {
      "name": "campaign",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "sponsor",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "beneficiary",
            "type": "pubkey"
          },
          {
            "name": "milestones",
            "type": {
              "vec": {
                "defined": {
                  "name": "milestone"
                }
              }
            }
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "status"
              }
            }
          },
          {
            "name": "totalMilestonesCompleted",
            "type": "u8"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "campaignBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "governanceConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isGraduated",
            "type": "bool"
          },
          {
            "name": "graduatedAt",
            "type": "i64"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "configBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "milestone",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "order",
            "type": "u8"
          },
          {
            "name": "totalVotes",
            "type": "u64"
          },
          {
            "name": "totalAgreedVotes",
            "type": "u64"
          },
          {
            "name": "totalDisagreedVotes",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "status"
              }
            }
          }
        ]
      }
    },
    {
      "name": "status",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "ongoing"
          },
          {
            "name": "completed"
          },
          {
            "name": "cancelled"
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "totalDonatedU64",
            "type": "u64"
          },
          {
            "name": "lastDonationAmount",
            "type": "u64"
          },
          {
            "name": "reputationScore",
            "type": "u16"
          },
          {
            "name": "userProfileBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voteReciept",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voter",
            "type": "pubkey"
          },
          {
            "name": "campaign",
            "type": "pubkey"
          },
          {
            "name": "milestoneIndex",
            "type": "u8"
          },
          {
            "name": "isAgreed",
            "type": "bool"
          },
          {
            "name": "voteReceiptBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
