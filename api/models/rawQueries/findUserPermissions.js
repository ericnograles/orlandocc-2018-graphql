const QUERY = `
SELECT DISTINCT 
p.code, 
p.label 
FROM permission p 
INNER JOIN permission_group_permissions pgp 
  ON p.id = pgp.permission_id 
INNER JOIN permission_group pg 
  ON pg.id = pgp.permission_group_id 
INNER JOIN user_permission_group upg 
  ON pg.id = upg.permission_group_id 
INNER JOIN public.user upg_user 
  ON upg_user.id = upg.user_id 
LEFT OUTER JOIN user_permission up 
  ON p.id = up.permission_id 
LEFT OUTER JOIN public.user up_user 
  ON up_user.id = up.user_id 
WHERE 
upg_user.id = :userId OR up_user.id = :userId
`;

module.exports = QUERY;