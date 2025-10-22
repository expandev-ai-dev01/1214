-- =============================================
-- Stored Procedure: spHabitDelete
-- Description: Soft deletes a habit (logical deletion)
-- =============================================
CREATE OR ALTER PROCEDURE [functional].[spHabitDelete]
    @idAccount INT,
    @idUser INT,
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validation: Required fields
    IF @idAccount IS NULL OR @idAccount <= 0
    BEGIN
        THROW 51000, 'idAccountRequired', 1;
        RETURN;
    END

    IF @idUser IS NULL OR @idUser <= 0
    BEGIN
        THROW 51000, 'idUserRequired', 1;
        RETURN;
    END

    IF @id IS NULL OR @id <= 0
    BEGIN
        THROW 51000, 'O hábito selecionado não existe', 1;
        RETURN;
    END

    -- Check if habit exists and belongs to user
    IF NOT EXISTS (
        SELECT 1 FROM [functional].[habit]
        WHERE [id] = @id
        AND [idAccount] = @idAccount
        AND [idUser] = @idUser
        AND [deleted] = 0
    )
    BEGIN
        THROW 51000, 'Você não tem permissão para excluir este hábito', 1;
        RETURN;
    END

    -- Soft delete habit
    UPDATE [functional].[habit]
    SET
        [deleted] = 1,
        [dateModified] = GETDATE()
    WHERE
        [id] = @id
        AND [idAccount] = @idAccount
        AND [idUser] = @idUser;

    -- Return success
    SELECT 1 AS [success];
END
GO