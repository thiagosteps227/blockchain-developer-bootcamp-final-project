pragma solidity >=0.4.0 <0.9.0;

// Defines a new type with two fields.
// Declaring a struct outside of a contract allows
// it to be shared by multiple contracts.
// Here, this is not really needed.

contract Crowdfunding {
    // Structs can also be defined inside contracts, which makes them
    // visible only there and in derived contracts.

    struct Funder {
        address addr;
        uint256 amount;
    }
    struct Campaign {
        uint256 campaignID;
        address payable beneficiary;
        uint256 fundingGoal;
        uint256 numFunders;
        uint256 amount;
    }

    //uint256 numCampaignPerFunders;
    mapping(uint256 => mapping(address => Funder)) campaignFunders;

    uint256 numCampaigns;
    mapping(uint256 => Campaign) campaigns;

    event CampaignCreated(uint256 campaignID);

    event Contribution(address indexed funder);

    event GoalReached(uint256 campaignID);

    function newCampaign(address payable beneficiary, uint256 fundingGoal) public {
        uint256 amount = 0;
        uint256 campaignID = numCampaigns++;
        uint256 numFunders;

        campaigns[campaignID] = Campaign(
            campaignID,
            beneficiary,
            fundingGoal,
            numFunders,
            amount
        );

        emit CampaignCreated(campaignID);
    }

    function contribute(uint256 campaignID) public payable {
        if (campaignFunders[campaignID][msg.sender].addr == address(0)) {
            Campaign storage c = campaigns[campaignID];
            campaignFunders[campaignID][msg.sender] = Funder(
                msg.sender,
                msg.value
            );
            c.amount += msg.value;
            c.numFunders += 1;
        }

        Campaign storage campaign = campaigns[campaignID];
        campaignFunders[campaignID][msg.sender].amount += msg.value;
        campaign.amount += msg.value;

        emit Contribution(msg.sender);
    }

    function checkGoalReached(uint256 campaignID)
        public
        returns (bool reached)
    {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal) return false;
        uint256 amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        emit GoalReached(campaignID);
        return true;
    }

    function getBeneficiary(uint256 campaignID)
        public
        view
        returns (address beneficiary)
    {
        Campaign memory campaign = campaigns[campaignID];
        beneficiary = campaign.beneficiary;
    }

    function getCampaignAmount(uint256 campaignID)
        public
        view
        returns (uint256 amount)
    {
        Campaign memory campaign = campaigns[campaignID];
        amount = campaign.amount;
    }

    function getCampaign(uint256 campaignID)
        public
        view
        returns (address beneficiary, uint256 fundingGoal, uint256 numFunders, uint256 amount)
    {
        Campaign memory campaign = campaigns[campaignID];
        beneficiary = campaign.beneficiary;
        fundingGoal = campaign.fundingGoal;
        numFunders = campaign.numFunders;
        amount = campaign.amount;
    }
}
