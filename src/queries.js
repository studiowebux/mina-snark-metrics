module.exports = {
  blockHeightQuery: `query blockHeight {
    daemonStatus {
      blockchainLength
    }
  }`,

  feesQuery: `query fees {
    block(height: $blockHeight) {
      snarkJobs {
        fee
      }
    }
  }`,

  snarkFeeQuery: `query blockHeight {
    daemonStatus {
      snarkWorkFee
    }
  }`,

  proversQuery: `query provers {
    block(height: $blockHeight) {
      snarkJobs {
        prover
      }
    }
  }`,
};
