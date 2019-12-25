import pluralize from 'pluralize'
import { DefaultNamingStrategy } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'

export default class TypeOrmNamingStrategy extends DefaultNamingStrategy {
  tableName(className: string, customName: any) {
    return customName || pluralize(snakeCase(className))
  }

  columnName(propertyName: string, customName: any, embeddedPrefixes: any[]) {
    return (
      snakeCase(embeddedPrefixes.join('_')) +
      (customName || snakeCase(propertyName))
    )
  }

  relationName(propertyName: string) {
    return snakeCase(propertyName)
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(
      pluralize.singular(relationName) + '_' + referencedColumnName,
    )
  }

  joinTableName(firstTableName: string, secondTableName: string) {
    return snakeCase(firstTableName + '_' + secondTableName)
  }

  joinTableColumnName(tableName: string, propertyName: any, columnName: any) {
    return snakeCase(
      pluralize.singular(tableName) + '_' + (columnName || propertyName),
    )
  }

  classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ) {
    return snakeCase(
      pluralize.singular(parentTableName) + '_' + parentTableIdPropertyName,
    )
  }
}
