package info.stepanoff.trsis.samples.db.dao;

import info.stepanoff.trsis.samples.db.model.School;
import org.springframework.data.repository.CrudRepository;


public interface SchoolRepository extends CrudRepository<School, Integer> {

    // List<School> findByNumber(Integer number);
}
