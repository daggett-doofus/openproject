import { Injectable } from '@angular/core';
import { StateService } from '@uirouter/core';
import { QueryResource } from 'core-app/features/hal/resources/query-resource';
import { APIV3Service } from 'core-app/core/apiv3/api-v3.service';
import { Observable } from 'rxjs';
import { View } from 'core-app/core/state/views/view.model';

@Injectable()
export class WorkPackagesQueryViewService {
  constructor(
    protected $state:StateService,
    protected apiV3Service:APIV3Service,
  ) { }

  create(query:QueryResource):Observable<View> {
    if (!query.href) {
      throw new Error('Expected only queries that are created since an href is required');
    }

    return this
      .apiV3Service
      .views
      .post(
        {
          _links: {
            query: {
              href: query.href,
            },
          },
        },
        this.viewType,
      );
  }

  private get viewType() {
    if (this.$state.includes('work-packages')) {
      return 'work_packages_table';
    }
    if (this.$state.includes('team_planner')) {
      return 'team_planner';
    }

    throw new Error('Not on a path defined for query views');
  }
}
