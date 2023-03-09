const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Test counter", function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    return { counter };
  }

  context("Owner", function () {
    it("Should have initial value of 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getCount()).to.equal(0);
    });

    it("Should increment counter", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should fail to decrement when counter is 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(counter.decrement()).to.be.reverted;
    });

    it("Should reset counter", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();

      await counter.reset();
      expect(await counter.getCount()).to.equal(0);
    });

    it("Should get counter value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      await counter.increment();
      await counter.increment();

      expect(await counter.getCount()).to.equal(3);
    });

    it("Should set counter value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.setCount(10);

      expect(await counter.getCount()).to.equal(10);
    });

    it("Should add counter with a specific value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.add(10);

      expect(await counter.getCount()).to.equal(10);
    });

    it("Should fail to sub counter when counter is 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(counter.sub(10)).to.be.reverted;
    });

    it("Should subtract counter with a specific value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.add(10);
      await counter.sub(5);

      expect(await counter.getCount()).to.equal(5);
    });
  });

  context("Not owner", function () {
    it("Should fail to set counter value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const [_, notOwner] = await ethers.getSigners();

      expect(counter.connect(notOwner).setCount(10)).to.be.reverted;
    });

    it("Should fail to add counter with a specific value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const [_, notOwner] = await ethers.getSigners();

      expect(counter.connect(notOwner).add(10)).to.be.reverted;
    });

    it("Should fail to subtract counter with a specific value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const [_, notOwner] = await ethers.getSigners();

      expect(counter.connect(notOwner).sub(10)).to.be.reverted;
    });
  });
});
