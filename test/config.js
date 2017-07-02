const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;

const fs = require("fs");

describe("config", function() {
  const config = require("../src/config");

  // Back up process.env and process.platform as we'll be mocking
  // them in these tests
  const originalPlatform = process.platform;
  const originalEnv = Object.assign({}, process.env);
  after(() => {
    process.env = originalEnv;
    process.platform = originalPlatform;
  });

  describe("#getHomePath", function() {
    it("returns the correct path on windows", function() {
      Object.defineProperty(process, "platform", {
        value: "win32"
      });
      process.env = {
        USERPROFILE: "\\c\\myuser",
        HOME: "/home/myuser/"
      };
      expect(config.getHomePath()).to.equal(process.env.USERPROFILE);
      expect(config.getHomePath()).not.to.equal(process.env.HOME);
    });
    it("returns the correct path on osx", function() {
      Object.defineProperty(process, "platform", {
        value: "darwin"
      });
      process.env = {
        USERPROFILE: "\\c\\myuser",
        HOME: "/home/myuser/"
      };
      expect(config.getHomePath()).to.equal(process.env.HOME);
      expect(config.getHomePath()).not.to.equal(process.env.USERPROFILE);
    });
    it("returns the correct path on linux", function() {
      Object.defineProperty(process, "platform", {
        value: "linux"
      });
      process.env = {
        USERPROFILE: "\\c\\myuser",
        HOME: "/home/myuser/"
      };
      expect(config.getHomePath()).to.equal(process.env.HOME);
      expect(config.getHomePath()).not.to.equal(process.env.USERPROFILE);
    });
  });

  describe("#getConfigDir", function() {
    it(
      "should return the correct directory",
      sinonTest(function() {
        mockProcessHomeFolder();
        expect(config.getConfigDir()).to.equal(
          process.env.HOME + ".trello-cli"
        );
      })
    );
  });

  describe("#configDirExists", function() {
    it(
      "should return true if the directory exists",
      sinonTest(function() {
        this.stub(fs, "existsSync").returns(true);
        expect(config.configDirExists()).to.eql(true);
      })
    );
    it(
      "should return false if the directory doesn't exist",
      sinonTest(function() {
        this.stub(fs, "existsSync").returns(false);
        expect(config.configDirExists()).to.eql(false);
      })
    );
  });

  describe("#createDefaultConfig", function() {
    it(
      "errors when it can't create the directory",
      sinonTest(function() {
        mockProcessHomeFolder();
        let mkdirStub = this.stub(fs, "mkdirSync");
        mkdirStub.throws(new Error("Unable to create directory"));

        expect(() => config.createDefaultConfig()).to.throw(
          "Unable to create folder: /home/myuser/.trello-cli"
        );
      })
    );
    it(
      "should create the config directory",
      sinonTest(function() {
        // Stub dependencies
        this.stub(fs, "writeFileSync");

        // Test
        let mkdirStub = this.stub(fs, "mkdirSync");

        config.createDefaultConfig();
        expect(mkdirStub).to.have.been.calledOnce;
      })
    );

    it(
      "should write a default config file",
      sinonTest(function() {
        mockProcessHomeFolder();
        let mkdirStub = this.stub(fs, "mkdirSync");
        mkdirStub.returns(true);

        let writeFileStub = this.stub(fs, "writeFileSync");
        writeFileStub.returns(true);

        config.createDefaultConfig();

        const args = writeFileStub.args[0];
        expect(writeFileStub).to.have.been.calledOnce;
        expect(args[0]).to.equal("/home/myuser/.trello-cli/config.json");
        expect(args[1]).to.equal(
          JSON.stringify(
            { auth: { clientId: "YOURAPIKEY", token: "AUTHTOKEN" } },
            null,
            4
          )
        );
      })
    );
  });

  describe("#ensureConfigExists", function() {
    it(
      "doesn't do anything when the directory exists",
      sinonTest(function() {
        let dirExistsStub = this.stub(config, "configDirExists");
        dirExistsStub.returns(true);

        let createConfigStub = this.stub(config, "createDefaultConfig");

        config.ensureConfigExists();
        expect(createConfigStub).not.to.have.been.called;
      })
    );
    it(
      "creates the default config when required",
      sinonTest(function() {
        let dirExistsStub = this.stub(config, "configDirExists");
        dirExistsStub.returns(false);

        let createConfigStub = this.stub(config, "createDefaultConfig");

        expect(() => config.ensureConfigExists()).to.throw(
          "Go to https://trello.com/app-key and generate the API key and replace YOURAPIKEY in /home/myuser/.trello-cli/config.json"
        );
      })
    );
  });

  describe("#ensureApplicationIdSet", function() {
    it(
      "does not throw when auth.clientId is set",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: { clientId: "ABC123" } }));

        config.ensureApplicationIdSet();
      })
    );
    it(
      "throws when auth does not exist",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: {} }));

        expect(() => config.ensureApplicationIdSet()).to.throw(
          "Please set auth.clientId in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.clientId does not exist",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: {} }));

        expect(() => config.ensureApplicationIdSet()).to.throw(
          "Please set auth.clientId in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.clientId is empty",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: { clientId: "" } }));

        expect(() => config.ensureApplicationIdSet()).to.throw(
          "Please set auth.clientId in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.clientId has not been changed",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(
          JSON.stringify({ auth: { clientId: "YOURAPIKEY" } })
        );

        expect(() => config.ensureApplicationIdSet()).to.throw(
          "Please set auth.clientId in /home/myuser/.trello-cli/config.json"
        );
      })
    );
  });

  describe("#ensureAuthTokenSet", function() {
    it(
      "does not throw when auth.token is set",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: { token: "demo_token" } }));

        config.ensureAuthTokenSet();
      })
    );
    it(
      "throws when auth does not exist",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: {} }));

        expect(() => config.ensureAuthTokenSet()).to.throw(
          "Please set auth.token in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.token does not exist",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: {} }));

        expect(() => config.ensureAuthTokenSet()).to.throw(
          "Please set auth.token in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.token is empty",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: { token: "" } }));

        expect(() => config.ensureAuthTokenSet()).to.throw(
          "Please set auth.token in /home/myuser/.trello-cli/config.json"
        );
      })
    );
    it(
      "throws when auth.token has not been changed",
      sinonTest(function() {
        let readFileStub = this.stub(fs, "readFileSync");
        readFileStub.returns(JSON.stringify({ auth: { token: "AUTHTOKEN" } }));

        expect(() => config.ensureAuthTokenSet()).to.throw(
          "Please set auth.token in /home/myuser/.trello-cli/config.json"
        );
      })
    );
  });
});

function mockProcessHomeFolder() {
  Object.defineProperty(process, "platform", {
    value: "linux"
  });
  process.env = {
    HOME: "/home/myuser/"
  };
}
