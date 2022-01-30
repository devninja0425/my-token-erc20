// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token {
    string public name = "RossCoin";
    string public symbol = "Ross";
    string public standard = "RossCoin v1.0";
    uint256 public totalSupply;
    constructor (uint256 _initialSupply)  {
        balanceOf[msg.sender] = 1000000000000000000000000;
        totalSupply = 1000000000000000000000000;
    }
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;


    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value,  "Sender balance is not sufficient");
        require(balanceOf[_to] + _value >= balanceOf[_to], "Transfer would cause overflow");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from],"Sender balance is not sufficient");
        require(_value <= allowance[_from][msg.sender], "Sender allowance is not sufficient");
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;

    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
