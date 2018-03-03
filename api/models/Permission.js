const { STRING, TEXT, DECIMAL, INTEGER } = require('sequelize');
const { DEFAULT_MODEL_SETTINGS } = require('./config');
const sequelize = require('../services/sequelize');
const winston = require('winston');

const Permission = sequelize.define(
  'permission',
  {
    code: {
      type: STRING,
      allowNull: false
    },
    label: {
      type: STRING,
      allowNull: false
    }
  },
  DEFAULT_MODEL_SETTINGS
);

const PermissionGroup = sequelize.define(
  'permission_group',
  {
    name: {
      type: STRING,
      allowNull: false
    }
  },
  DEFAULT_MODEL_SETTINGS
);

const PermissionGroupPermissions = sequelize.define(
  'permission_group_permissions',
  {},
  DEFAULT_MODEL_SETTINGS
);

// Associations. See: http://docs.sequelizejs.com/manual/tutorial/associations.html
PermissionGroupPermissions.belongsTo(PermissionGroup, {
  foreignKey: 'permission_group_id'
});
PermissionGroupPermissions.belongsTo(Permission, {
  foreignKey: 'permission_id'
});

async function migrate() {
  try {
    await Permission.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    await PermissionGroup.sync({
      force: process.env.RECREATE_SCHEMA === 'true'
    });
    await PermissionGroupPermissions.sync({
      force: process.env.RECREATE_SCHEMA === 'true'
    });

    let createPermissions = [
      {
        code: 'IMPERSONATE',
        label: 'Can Impersonate Other Users'
      },
      {
        code: 'VIEW_ALL_USERS',
        label: 'Can View Other User Profiles'
      }
    ];

    let permissions = await Promise.all(
      createPermissions.map(permissionRecord => {
        return Permission.create(permissionRecord);
      })
    );

    let permissionGroup = await PermissionGroup.create({
      name: 'System Administrator'
    });

    await permissions.map(permission => {
      return PermissionGroupPermissions.create({
        permission_group_id: permissionGroup.id,
        permission_id: permission.id
      });
    });
  } catch (error) {
    winston.error(error);
  }
}

module.exports = {
  Permission,
  PermissionGroup,
  PermissionGroupPermissions,
  migrate
};
